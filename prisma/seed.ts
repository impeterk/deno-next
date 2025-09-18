import { PrismaClient } from "../lib/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  // Create categories
  const electronics = await prisma.category.create({
    data: { name: "Electronics" },
  });
  const books = await prisma.category.create({
    data: { name: "Books" },
  });
  const clothing = await prisma.category.create({
    data: { name: "Clothing" },
  });

  // Create products
  await prisma.product.createMany({
    data: [
      {
        name: "Smartphone",
        description: "Latest model smartphone with advanced features.",
        price: 699.99,
        stock: 50,
        categoryId: electronics.id,
        image: "smartphone.jpg",
      },
      {
        name: "Laptop",
        description: "High performance laptop for work and gaming.",
        price: 1299.99,
        stock: 30,
        categoryId: electronics.id,
        image: "laptop.jpg",
      },
      {
        name: "Novel Book",
        description: "Bestselling novel by a famous author.",
        price: 19.99,
        stock: 100,
        categoryId: books.id,
        image: "novel.jpg",
      },
      {
        name: "T-Shirt",
        description: "Comfortable cotton t-shirt.",
        price: 14.99,
        stock: 200,
        categoryId: clothing.id,
        image: "tshirt.jpg",
      },
      {
        name: "Jeans",
        description: "Stylish denim jeans.",
        price: 39.99,
        stock: 80,
        categoryId: clothing.id,
        image: "jeans.jpg",
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
