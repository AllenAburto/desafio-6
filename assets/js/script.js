async function GenerarAPI() {
    try {
      const response = await fetch('https://mindicador.cl/api');
  
      if (!response.ok) {
        throw new Error(`La API respondió con un estado no válido: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching exchange rates:', error);

      document.getElementById('resultado').innerText = 'Error al obtener los datos desde la API. Intente nuevamente mas tarde.';
      throw error;
    }
  }

  GenerarAPI();
  
  async function convertir() {
    const valor = parseFloat(document.getElementById("valor").value);
    const seleccion = document.getElementById("opciones");
    const calculo =
      seleccion.options[seleccion.selectedIndex].text.toLowerCase();
  
    const cambio = await GenerarAPI();
    let resultado;
  
    switch (calculo) {
      case "uf":
        resultado = valor / cambio.uf.valor;
        break;
      case "utm":
        resultado = valor / cambio.utm.valor;
        break;
      case "dolar":
        resultado = valor / cambio.dolar.valor;
        break;
      default:
        resultado = "Seleccione una moneda válida.";
    }
  
    document.getElementById(
      "resultado"
    ).innerText = `Resultado: ${resultado.toFixed(
      2                                                                       
    )} ${calculo.toUpperCase()}`;
  }


 