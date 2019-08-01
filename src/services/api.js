export async function getRates(base='EUR') {
  try {
    const response = await fetch(`https://api.exchangeratesapi.io/latest?base=${base}`);
    const { rates } = await response.json();
    return { rates };
  } catch (e) {
    console.log(e);
  }
}