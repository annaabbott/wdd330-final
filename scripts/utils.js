export function selectRandomItems(list, count) {
  if (count >= list.length) {
    return list;
  }

  const result = [];
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * list.length);
    result.push(list[x]);
    list.splice(x, 1);
  }
  return result;
}
