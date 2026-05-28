import { Product } from "../interface/product.interface";
import { MOCK_CATEGORIES } from "./categories.mock";

const NOMBRES_BEBIDAS = ['Gaseosa de Naranja', 'Agua mineral', 'Jugo de Manzana', 'Café', 'Té Helado', 'Cerveza Artesanal', 'Limonada', 'Batido de Frutilla', 'Vino Tinto', 'Agua con gas'];
const NOMBRES_COMIDA = ['Hamburguesa doble', 'Pizza Margherita', 'Ensalada Caesar', 'Tacos de Carne', 'Sándwich de Pollo', 'Sushi Mix', 'Pasta Carbonara', 'Burrito', 'Milanesa', 'Wrap Vegetariano'];
const NOMBRES_POSTRE = ['Helado combinado', 'Tiramisú', 'Brownie con helado', 'Cheesecake', 'Flan casero', 'Mousse de Chocolate', 'Ensalada de frutas', 'Alfajor', 'Volcán de chocolate', 'Apple Pie'];

const generateDescription = (categoria: string, nombre: string) => {
  return `Delicioso ${nombre} de alta calidad, ideal para disfrutar en cualquier momento del día. Perfecto para compartir o deleitarse individualmente.`;
};

export const MOCK_PRODUCTS: Product[] = Array.from({ length: 100 }, (_, index) => {
  const id = index + 1;
  const categoriaIdx = index % 3;

  let nombre = '';
  let precio = 0;
  let categoryId = 0;
  let categoriaLabel = '';
  let queryImg = '';

  if (categoriaIdx === 0) {
    nombre = NOMBRES_BEBIDAS[index % NOMBRES_BEBIDAS.length];
    precio = Math.floor(Math.random() * (3000 - 1000) + 1000);
    categoryId = 1;
    categoriaLabel = 'Bebida';
    queryImg = 'drink';
  } else if (categoriaIdx === 1) {
    nombre = NOMBRES_COMIDA[index % NOMBRES_COMIDA.length];
    precio = Math.floor(Math.random() * (20000 - 8000) + 8000);
    categoryId = 2;
    categoriaLabel = 'Comida';
    queryImg = 'food';
  } else {
    nombre = NOMBRES_POSTRE[index % NOMBRES_POSTRE.length];
    precio = Math.floor(Math.random() * (6000 - 2000) + 2000);
    categoryId = 3;
    categoriaLabel = 'Postre';
    queryImg = 'dessert';
  }

  return {
    id,
    name: `${nombre} ${id}`,
    price: precio,
    categoryId: categoryId,
    category: MOCK_CATEGORIES[categoryId - 1],
    description: generateDescription(categoriaLabel, nombre),
    imageUrl: `https://placehold.co/400x400/000000/FFFFFF/png?text=${encodeURIComponent(nombre)}`
  };
});
