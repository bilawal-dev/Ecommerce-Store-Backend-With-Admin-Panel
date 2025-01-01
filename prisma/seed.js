import prisma from "../database/db.config.js";

async function main() {
  // Delete existing products and categories (to overwrite)
  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.user.deleteMany({});

  // Create admin user
  await prisma.user.create({
    data: {
      "username": 'Muhammad Bilawal',
      "email": "bk4449719@gmail.com",
      "password": "$2a$10$8bs3FqDFYffRmOnsSxHjUOoKNXKWC.zCSxkcs09BQYl0qu.QtT3m.",
      "role": "ADMIN",
    }
  });

  // Create categories
  const headphonesCategory = await prisma.category.create({
    data: {
      name: 'Headphones',
    },
  });

  const wirelessEarbudsCategory = await prisma.category.create({
    data: {
      name: 'Wireless Earbuds',
    },
  });

  const smartWatchesCategory = await prisma.category.create({
    data: {
      name: 'Smart Watches',
    },
  });

  const bluetoothSpeakersCategory = await prisma.category.create({
    data: {
      name: 'Bluetooth Speakers',
    },
  });

  // Create products for Headphones category
  await prisma.product.createMany({
    data: [
      {
        name: 'Over-Ear Headphones',
        description: 'Comfortable over-ear headphones with noise cancellation',
        price: 149,
        category: headphonesCategory.name,
      },
      {
        name: 'In-Ear Headphones',
        description: 'Lightweight in-ear headphones with deep bass',
        price: 59,
        category: headphonesCategory.name,
      },
      {
        name: 'Noise-Cancelling Headphones',
        description: 'Noise-cancelling headphones with Bluetooth connectivity',
        price: 199,
        category: headphonesCategory.name,
      },
      {
        name: 'Gaming Headset',
        description: 'Wireless gaming headset with surround sound',
        price: 129,
        category: headphonesCategory.name,
      },
      {
        name: 'Sport Headphones',
        description: 'Sweat-proof and secure sport headphones for running',
        price: 79,
        category: headphonesCategory.name,
      },
    ],
  });

  // Create products for Wireless Earbuds category
  await prisma.product.createMany({
    data: [
      {
        name: 'True Wireless Earbuds',
        description: 'Premium quality earbuds with touch controls',
        price: 99,
        category: wirelessEarbudsCategory.name,
      },
      {
        name: 'Noise-Cancelling Earbuds',
        description: 'Earbuds with active noise cancellation and deep sound',
        price: 119,
        category: wirelessEarbudsCategory.name,
      },
      {
        name: 'Waterproof Earbuds',
        description: 'IPX7 rated waterproof earbuds for sports and workouts',
        price: 69,
        category: wirelessEarbudsCategory.name,
      },
      {
        name: 'Compact Wireless Earbuds',
        description: 'Small and compact earbuds with great sound quality',
        price: 49,
        category: wirelessEarbudsCategory.name,
      },
      {
        name: 'Wireless Charging Earbuds',
        description: 'Earbuds with wireless charging case and long battery life',
        price: 89,
        category: wirelessEarbudsCategory.name,
      },
    ],
  });

  // Create products for Smart Watches category
  await prisma.product.createMany({
    data: [
      {
        name: 'Smart Watch Series 6',
        description: 'Smartwatch with fitness tracking, heart rate monitor, and GPS',
        price: 249,
        category: smartWatchesCategory.name,
      },
      {
        name: 'Fitness Smart Watch',
        description: 'Waterproof smartwatch with sleep tracking and activity monitoring',
        price: 129,
        category: smartWatchesCategory.name,
      },
      {
        name: 'Smart Watch Pro',
        description: 'Advanced smartwatch with ECG and SpO2 monitoring',
        price: 299,
        category: smartWatchesCategory.name,
      },
      {
        name: 'Kids Smart Watch',
        description: 'Smartwatch for kids with GPS tracking and games',
        price: 89,
        category: smartWatchesCategory.name,
      },
      {
        name: 'Luxury Smart Watch',
        description: 'Premium smartwatch with leather strap and custom features',
        price: 499,
        category: smartWatchesCategory.name,
      },
    ],
  });

  // Create products for Bluetooth Speakers category
  await prisma.product.createMany({
    data: [
      {
        name: 'Portable Bluetooth Speaker',
        description: 'Compact and portable Bluetooth speaker with 10-hour battery life',
        price: 59,
        category: bluetoothSpeakersCategory.name,
      },
      {
        name: 'Waterproof Bluetooth Speaker',
        description: 'IPX7 waterproof Bluetooth speaker for outdoor use',
        price: 89,
        category: bluetoothSpeakersCategory.name,
      },
      {
        name: 'Smart Bluetooth Speaker',
        description: 'Bluetooth speaker with built-in voice assistant and smart features',
        price: 129,
        category: bluetoothSpeakersCategory.name,
      },
      {
        name: 'Mini Bluetooth Speaker',
        description: 'Ultra-portable mini Bluetooth speaker with rich sound',
        price: 29,
        category: bluetoothSpeakersCategory.name,
      },
      {
        name: 'High-Quality Bluetooth Speaker',
        description: 'High-fidelity sound with a premium design and bass boost',
        price: 149,
        category: bluetoothSpeakersCategory.name,
      },
    ],
  });

  // Update product count for each category
  await prisma.category.update({
    where: { id: headphonesCategory.id },
    data: { productCount: { increment: 5 } }, // 5 products in Headphones category
  });

  await prisma.category.update({
    where: { id: wirelessEarbudsCategory.id },
    data: { productCount: { increment: 5 } }, // 5 products in Wireless Earbuds category
  });

  await prisma.category.update({
    where: { id: smartWatchesCategory.id },
    data: { productCount: { increment: 5 } }, // 5 products in Smart Watches category
  });

  await prisma.category.update({
    where: { id: bluetoothSpeakersCategory.id },
    data: { productCount: { increment: 5 } }, // 5 products in Bluetooth Speakers category
  });

  console.log('Seeding completed');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });