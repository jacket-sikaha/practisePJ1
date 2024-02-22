export const testAPI = async () => {
  const res = await Promise.all(
    Array.from({ length: 20 }).map((_, i) =>
      fetch("https://jsonplaceholder.typicode.com/todos/" + (i + 1))
    )
  );
  return await Promise.all(res.map((item) => item.json()));
};
