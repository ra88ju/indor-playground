import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const restaurantSections = [
  {
    category: "Bangla Food",
    icon: "🍛",
    items: [
      { 
        id: "bhuna-khichuri",
        name: "Bhuna Khichuri", 
        description: "A delicious mix of rice and lentils with meat", 
        price: "৳250",
        image: "/resturents/khichuri.jpg"
      },
      { 
        id: "panta-ilish",
        name: "Panta Ilish", 
        description: "Fermented rice with fried Hilsa fish", 
        price: "৳450",
        image: "/resturents/panta-ilish.jpg"
      },
      { 
        id: "morog-polao",
        name: "Morog Polao", 
        description: "Rich chicken polao", 
        price: "৳300",
        image: "/resturents/morog-polao.jpg"
      },
    ],
  },
  {
    category: "Chinese Food",
    icon: "🥡",
    items: [
      { 
        id: "fried-rice",
        name: "Fried Rice", 
        description: "Classic vegetable or chicken fried rice", 
        price: "৳180",
        image: "/resturents/fried-rice.jpg"
      },
      { 
        id: "chicken-chowmein",
        name: "Chicken Chow Mein", 
        description: "Stir-fried noodles with chicken and vegetables", 
        price: "৳220",
        image: "/resturents/chicken-chowmein.jpg"
      },
      { 
        id: "spring-roll",
        name: "Spring Roll", 
        description: "Crispy fried rolls with vegetable filling", 
        price: "৳100",
        image: "/resturents/spring-roll.jpg"
      },
    ],
  },
  {
    category: "Juice Bar",
    icon: "🍹",
    items: [
      {
        id: "orange-juice",
        name: "Fresh Orange Juice",
        description: "Freshly squeezed orange juice, served chilled",
        price: "৳120",
        image: "/resturents/orange-juice.jpg"
      },
      {
        id: "mango-smoothie",
        name: "Mango Smoothie",
        description: "Creamy mango smoothie with a hint of mint",
        price: "৳150",
        image: "/resturents/mango-smoothie.jpg"
      },
      {
        id: "lemon-mint",
        name: "Lemon Mint Cooler",
        description: "Refreshing lemon and mint drink",
        price: "৳100",
        image: "/resturents/lemon-mint.jpg"
      },
    ],
  },
];

// GET endpoint to fetch menu items
export async function GET() {
  return NextResponse.json(restaurantSections);
}

// POST endpoint to handle orders
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { itemId, quantity, specialInstructions } = body;

    // Validate required fields
    if (!itemId || !quantity) {
      return NextResponse.json(
        { error: 'Item ID and quantity are required' },
        { status: 400 }
      );
    }

    // Validate quantity
    if (quantity < 1) {
      return NextResponse.json(
        { error: 'Quantity must be at least 1' },
        { status: 400 }
      );
    }

    // Find the ordered item
    let orderedItem = null;
    for (const section of restaurantSections) {
      const item = section.items.find(item => item.id === itemId);
      if (item) {
        orderedItem = item;
        break;
      }
    }

    if (!orderedItem) {
      return NextResponse.json(
        { error: 'Item not found' },
        { status: 404 }
      );
    }

    // Here you would typically:
    // 1. Save order to database
    // 2. Process payment
    // 3. Send order to kitchen
    // 4. Send confirmation email

    console.log('Order received:', {
      item: orderedItem,
      quantity,
      specialInstructions
    });

    return NextResponse.json(
      { 
        message: 'Order placed successfully',
        orderId: Math.random().toString(36).substring(7),
        orderDetails: {
          item: orderedItem,
          quantity,
          specialInstructions,
          total: parseInt(orderedItem.price.replace('৳', '')) * quantity
        }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing order:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}