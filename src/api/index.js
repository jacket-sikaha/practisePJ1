export const testAPI = async () => {
  const res = await Promise.all(
    Array.from({ length: 20 }).map((_, i) =>
      fetch("https://jsonplaceholder.typicode.com/todos/" + (i + 1))
    )
  );
  return await Promise.all(res.map((item) => item.json()));
};
// 添加一个固定的延迟时间，以便你可以看到加载状态
export async function delayForDemo(promise) {
  await new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });
  return promise;
}
