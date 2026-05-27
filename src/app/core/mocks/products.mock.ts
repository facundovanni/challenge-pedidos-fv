import { Product } from "../interface/product.interface";
import { MOCK_CATEGORIES } from "./categories.mock";

const NOMBRES_BEBIDAS = ['Gaseosa de Naranja', 'Agua mineral', 'Jugo de Manzana', 'Café', 'Té Helado', 'Cerveza Artesanal', 'Limonada', 'Batido de Frutilla', 'Vino Tinto', 'Agua con gas'];
const NOMBRES_COMIDA = ['Hamburguesa doble', 'Pizza Margherita', 'Ensalada Caesar', 'Tacos de Carne', 'Sándwich de Pollo', 'Sushi Mix', 'Pasta Carbonara', 'Burrito', 'Milanesa', 'Wrap Vegetariano'];
const NOMBRES_POSTRE = ['Helado combinado', 'Tiramisú', 'Brownie con helado', 'Cheesecake', 'Flan casero', 'Mousse de Chocolate', 'Ensalada de frutas', 'Alfajor', 'Volcán de chocolate', 'Apple Pie'];

export const MOCK_PRODUCTS: Product[] = Array.from({ length: 100 }, (_, index) => {
  const id = index + 1;
  const categoria = index % 3; // 0, 1, 2

  let nombre = '';
  let precio = 0;
  let categoryId = 0;

  if (categoria === 0) { // Bebidas
    nombre = NOMBRES_BEBIDAS[index % NOMBRES_BEBIDAS.length] + ` ${index}`;
    precio = Math.floor(Math.random() * (3000 - 1000) + 1000);
    categoryId = 1;
  } else if (categoria === 1) { // Comida
    nombre = NOMBRES_COMIDA[index % NOMBRES_COMIDA.length] + ` ${index}`;
    precio = Math.floor(Math.random() * (20000 - 8000) + 8000);
    categoryId = 2;
  } else { // Postres
    nombre = NOMBRES_POSTRE[index % NOMBRES_POSTRE.length] + ` ${index}`;
    precio = Math.floor(Math.random() * (6000 - 2000) + 2000);
    categoryId = 3;
  }

  return {
    id,
    name: nombre,
    price: precio,
    categoryId: categoryId,
    category: MOCK_CATEGORIES[categoryId - 1]
  };
});

