import Main from "./component/Main";
import Control from "./component/Control";
import "./App.css";
import { useRef, useState } from "react";
function App() {
  const [result, setResult] = useState(0);
  let pointStatus = useRef(false);
  // 计算符号切换开关
  let changeCalculate = useRef(false);
  //展示数据字符串
  const [presentVal, setPresentVal] = useState("0");

  //字符串解析成算术表达式
  function parseString(str) {
    return window.Function('"use strict";return (' + str + ")")();
  }

  function reset() {
    setPresentVal("0");
    setResult(0);
    changeCalculate.current = false;
    pointStatus.current = changeCalculate.current;
  }

  function delChar() {
    setPresentVal((oldVal) => {
      //删除到只剩一位字符串，默认0

      if (oldVal.length === 1) {
        return "0";
      } else {
        let res = oldVal.slice(0, oldVal.length - 1);
        if (res.slice(-1) === ".") {
          //删除到小数点
          pointStatus.current = true;
          changeCalculate.current = false;
        } else if (isNaN(res.slice(-1))) {
          if (oldVal.slice(-3) === "NaN") {
            //删前就是NaN 直接去掉
            res = oldVal.slice(0, -3);
          }
          //删除到计算符  会变成切换模式
          changeCalculate.current = true;
          pointStatus.current = !changeCalculate.current;
        } else {
          //删除到num---小数和整数需要另外确定
          res
            // .match(/([1-9]\d*\.?\d*)|(0\.?\d*)/g)
            // 考虑了。x  和  x。 两种特殊输入
            //正则表达式获取最后一个数字形式，以此去调整pointStatus状态
            .match(/([0-9]+\.?\d*e.\d+)|([0-9]+\.?\d*)|(\.\d+)/gm)
            .slice(-1)[0]
            .indexOf(".") >= 0
            ? (pointStatus.current = true)
            : (pointStatus.current = false);
          changeCalculate.current = false;
        }
        return res;
      }
    });
  }

  const getResult = (str) => {
    try {
      if (
        str.slice(-1) === "+" ||
        str.slice(-1) === "-" ||
        str.slice(-1) === "*" ||
        str.slice(-1) === "/"
      ) {
        str = str.slice(0, -1);
      }
      setResult(parseString(str));
    } catch (error) {
      setResult("error");
    }
  };

  const changeLastNum = (str) => {
    //计算符号后%无效
    if (
      str.slice(-1) === "+" ||
      str.slice(-1) === "-" ||
      str.slice(-1) === "*" ||
      str.slice(-1) === "/"
    ) {
      return;
    }
    //计算符号 + 。  为错误输入
    else if (/[^\d]\.$/.test(str)) {
      setPresentVal((oldValue) => {
        return oldValue.slice(0, -1) + "NaN";
      });
      changeCalculate.current = false;
      pointStatus.current = false;
    } else {
      // let numArr = str.match(/([1-9]\d*\.?\d*)|(0\.?\d*)|(\.\d+)|(\d+\.$)/g);
      let numArr = str.match(/([0-9]+\.?\d*e.\d+)|([0-9]+\.?\d*)|(\.\d+)/gm);

      //获取最后一串数字
      const lastNum = numArr.slice(-1)[0];
      //最后一串数字前的字符串
      const exactPre = str.slice(0, -lastNum.length);
      const exactPreLastChar = exactPre.slice(-1);
      if (parseFloat(lastNum) === 0) {
        //小数，整数 的0整理格式
        setPresentVal(exactPre + "0");
        changeCalculate.current = false;
        pointStatus.current = false;
      }
      //只有一串数字时 或者 最后一个计算符号为/ | *
      else if (
        numArr.length === 1 ||
        exactPreLastChar === "/" ||
        exactPreLastChar === "*"
      ) {
        let newLastNum = (parseFloat(lastNum) / 100).toString();
        pointStatus.current = /\./.test(newLastNum);
        setPresentVal(exactPre + newLastNum);
      }
      //最后一个计算符号为 +  -
      else {
        let preResult = parseString(exactPre.slice(0, -1));
        let newLastNum = ((parseFloat(lastNum) / 100) * preResult).toString();
        pointStatus.current = /\./.test(newLastNum);
        setPresentVal(exactPre + newLastNum);
      }
    }
  };

  const getInputValue = (value) => {
    switch (value) {
      case "change":
        break;
      case "C":
        //重制操作
        reset();
        break;
      case "del":
        //del
        delChar();
        break;
      case "=":
        getResult(presentVal);
        break;
      default:
        //存在NaN 不能添加任何参数
        if (presentVal.indexOf("NaN") > 0) {
          console.log(" NaN", 2222);
          return;
        }
        if (isNaN(value)) {
          //加减乘除---每次执行默认前方已有确切数字且支持切换
          if (value !== "." && value !== "%") {
            //  切换
            if (changeCalculate.current) {
              setPresentVal((oldVal) => {
                return oldVal.slice(0, oldVal.length - 1) + value;
              });
            } else {
              //  正常添加
              setPresentVal((oldVal) => oldVal + value);
              changeCalculate.current = true;
              pointStatus.current = false;
            }
          } else {
            //pointStatus限制。的重复添加
            if (value === "." && !pointStatus.current) {
              setPresentVal((oldVal) => oldVal + value);
              pointStatus.current = true;
              changeCalculate.current = false;
              console.log(".");
            } else if (value === "%") {
              changeLastNum(presentVal);
            }
          }
        } else {
          //add number
          let lastNum = parseFloat(
            presentVal
              .match(/([0-9]+\.?\d*e.\d+)|([0-9]+\.?\d*)|(\.\d+)/gm)
              .slice(-1)[0]
          );

          //靠右数字不为0 或者 计算字符还未输入，或符合（）原则 就直接加
          //添加。后数字变成小数状态，0没有添加限制
          if (lastNum !== 0 || changeCalculate.current || pointStatus.current) {
            setPresentVal((oldVal) => {
              return oldVal + value;
            });
          } else {
            //数字确定为0但输入值不为0就需要 替换 字符串
            if (value !== "0") {
              setPresentVal(presentVal.slice(0, -1) + value);
            }
          }
          //允许添加计算符号标记
          changeCalculate.current = false;
        }
        break;
    }
  };

  return (
    <div className="t">
      <Main presentVal={presentVal} result={result}></Main>
      <Control getInputValue={getInputValue}></Control>
    </div>
  );
}

export default App;
