import Main from "./component/Main";
import Control from "./component/Control";
import "./App.css";
import { useEffect, useRef, useState } from "react";
function App() {
  const [result, setResult] = useState(0);
  // let calculate = useRef([]);
  let numArr = useRef([]);
  // let startZeroFlag = useRef(true);
  let changeCalculate = useRef(false);
  const [calculate, setCalculate] = useState([]);
  //展示数据字符串
  const [presentVal, setPresentVal] = useState("0");

  const getValue = (value) => {
    console.log("numArr.current", numArr.current);
    //change
    if (value === "change") {
      return;
    }

    //重制操作
    if (value === "C") {
      setPresentVal("0");
      setResult(0);
      return;
    }

    //del
    if (value === "del") {
      setPresentVal((oldVal) => {
        //删除到只剩一位字符串，默认0
        if (oldVal.length === 1) {
          return "0";
        } else {
          let res = oldVal.slice(0, oldVal.length - 1);
          //删除到计算符会变成切换模式
          changeCalculate.current = isNaN(res.slice(-1));
          return res;
        }
      });
      return;
    }

    // =
    if (value === "=") {
      getResult();
      return;
    }

    if (isNaN(value)) {
      //加减乘除---每次执行默认前方已有确切数字且支持切换
      if (value !== "." && value !== "%") {
        if (changeCalculate.current) {
          setPresentVal((oldVal) => {
            return oldVal.slice(0, oldVal.length - 1) + value;
          });
        } else {
          setPresentVal((oldVal) => oldVal + value);
          changeCalculate.current = true;
        }
        // calculate.push(value);
        // numArr.push(parseFloat(presentVal));
      } else {
        console.log(". %");
      }
    } else {
      //add number
      let lastNum = parseFloat(presentVal.match(/\d+/g).slice(-1)[0]);
      //靠右数字不为0 或者 计算字符还未输入，或符合（）原则 就直接加
      if (lastNum !== 0 || changeCalculate.current) {
        setPresentVal((oldVal) => {
          return oldVal + value;
        });
      } else {
        //数字确定为0但输入值不为0就需要 替换 字符串
        if (value !== "0") {
          setPresentVal(presentVal.slice(0, presentVal.length - 1) + value);
        }
      }
      //可以添加计算符号标记
      changeCalculate.current = false;
    }
  };

  const getResult = (calArr) => {
    //暂时以正则表达式形式提取数字/小数
    let numArr = presentVal
      .match(/([1-9]\d*\.?\d*)|(0\.?\d*)/g)
      .map(parseFloat);
    console.log("numArr", numArr);
    let res = numArr[0];
    for (let i = 0; i < calArr.length; i++) {
      switch (calArr[i]) {
        case "+":
          break;

        case "-":
          break;
        case "*":
          break;
        case "/":
          break;
        default:
          break;
      }
    }
  };
  return (
    <div className="t">
      <Main presentVal={presentVal} result={result}></Main>
      <Control getValue={getValue}></Control>
    </div>
  );
}

export default App;
