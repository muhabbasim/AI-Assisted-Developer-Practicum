import { pool } from '../config/database.js';
import dotenv from 'dotenv';
dotenv.config();

// Products data migrated from frontend
const products = [
  {
    name: "The Midnight Library",
    author: "Matt Haig",
    description: "Between life and death, Nora Seed finds herself in a library with infinite books, each offering a glimpse into a different life she could have lived. A profound exploration of regret, hope, and the infinite possibilities of existence.",
    price: 65.00,
    image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1602190253i/52578297.jpg",
    category: "Fiction",
    stock_quantity: 50
  },
  {
    name: "The Alchemist",
    author: "Paulo Coelho",
    description: "A timeless tale of Santiago, an Andalusian shepherd boy who dreams of discovering a worldly treasure. This enchanting novel is about listening to our hearts, recognizing opportunity, and following our dreams.",
    price: 55.00,
    image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1654371463i/18144590.jpg",
    category: "Fiction",
    stock_quantity: 40
  },
  {
    name: "Where the Crawdads Sing",
    author: "Delia Owens",
    description: "A haunting tale of survival and resilience about Kya, the 'Marsh Girl,' who grows up isolated in the marshlands of North Carolina. When a local celebrity is found dead, she becomes the prime suspect.",
    price: 72.00,
    image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1582135294i/36809135.jpg",
    category: "Fiction",
    stock_quantity: 35
  },
  {
    name: "The Silent Patient",
    author: "Alex Michaelides",
    description: "Alicia Berenson lived a seemingly perfect life until she shot her husband five times and never spoke another word. Theo Faber, a psychotherapist, is determined to unravel the mystery and get her to talk.",
    price: 68.00,
    image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1582759969i/40097951.jpg",
    category: "Mystery",
    stock_quantity: 45
  },
  {
    name: "Gone Girl",
    author: "Gillian Flynn",
    description: "On their fifth wedding anniversary, Amy Dunne disappears. Her husband Nick becomes the prime suspect, but nothing is what it seems in this psychological thriller that redefines the marriage thriller.",
    price: 62.00,
    image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1554086139i/19288043.jpg",
    category: "Mystery",
    stock_quantity: 30
  },
  {
    name: "Dune",
    author: "Frank Herbert",
    description: "Set on the desert planet Arrakis, this epic science fiction masterpiece follows Paul Atreides as he navigates politics, religion, and ecology in humanity's far future. A timeless tale of power, destiny, and survival.",
    price: 95.00,
    image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1555447414i/44767458.jpg",
    category: "Science Fiction",
    stock_quantity: 25
  },
  {
    name: "Project Hail Mary",
    author: "Andy Weir",
    description: "Ryland Grace wakes up on a spacecraft with no memory of how he got there. His crewmates are dead, and he's on a desperate mission to save humanity. A thrilling space adventure from the author of The Martian.",
    price: 78.00,
    image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1597695864i/54493401.jpg",
    category: "Science Fiction",
    stock_quantity: 40
  },
  {
    name: "The Name of the Wind",
    author: "Patrick Rothfuss",
    description: "Kvothe tells his own story: a tale of magic, adventure, and the search for truth in a world where legends are made. The first book in the mesmerizing Kingkiller Chronicle series.",
    price: 85.00,
    image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1270352123i/186074.jpg",
    category: "Fantasy",
    stock_quantity: 35
  },
  {
    name: "Atomic Habits",
    author: "James Clear",
    description: "A revolutionary system for getting 1% better every day. Clear reveals practical strategies for forming good habits, breaking bad ones, and mastering the tiny behaviors that lead to remarkable results.",
    price: 89.00,
    image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1655988385i/40121378.jpg",
    category: "Self-Help",
    stock_quantity: 60
  },
  {
    name: "Deep Work",
    author: "Cal Newport",
    description: "In a distracted world, the ability to focus intensely is becoming increasingly rare and valuable. Newport shows how to cultivate deep work and thrive in the modern economy.",
    price: 75.00,
    image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1447957962i/25744928.jpg",
    category: "Business",
    stock_quantity: 45
  },
  {
    name: "The Psychology of Money",
    author: "Morgan Housel",
    description: "Timeless lessons on wealth, greed, and happiness. Housel shares insights about how people think about money and teaches you how to make better financial decisions.",
    price: 70.00,
    image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1581527774i/41881472.jpg",
    category: "Business",
    stock_quantity: 50
  },
  {
    name: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    description: "A groundbreaking tour of the mind from Nobel Prize winner Daniel Kahneman. He explains the two systems that drive the way we think and offers insights into decision-making in both business and personal life.",
    price: 92.00,
    image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1317793965i/11468377.jpg",
    category: "Psychology",
    stock_quantity: 30
  },
  {
    name: "Sapiens",
    author: "Yuval Noah Harari",
    description: "A brief history of humankind from the Stone Age to the modern age. Harari challenges everything we thought we knew about being human, exploring how biology and history have shaped our societies.",
    price: 88.00,
    image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1703329310i/23692271.jpg",
    category: "History",
    stock_quantity: 55
  },
  {
    name: "Educated",
    author: "Tara Westover",
    description: "Born to survivalists in the mountains of Idaho, Tara Westover was seventeen the first time she set foot in a classroom. An unforgettable memoir about a young woman who questions her beliefs and creates a new life through education.",
    price: 76.00,
    image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1506026635i/35133922.jpg",
    category: "Biography",
    stock_quantity: 40
  },
  {
    name: "The Gene",
    author: "Siddhartha Mukherjee",
    description: "An intimate history of genetics and the quest to understand human heredity. From Aristotle to cutting-edge gene therapies, this is a sweeping narrative of one of the most powerful ideas in modern science.",
    price: 95.00,
    image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1452452965i/27276428.jpg",
    category: "Science",
    stock_quantity: 25
  },
  {
    name: "Clean Code",
    author: "Robert C. Martin",
    description: "A handbook of agile software craftsmanship. Even bad code can function, but if code isn't clean, it can bring a development organization to its knees. This book teaches you how to write good code.",
    price: 165.00,
    image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1436202607i/3735293.jpg",
    category: "Technology",
    stock_quantity: 30
  },
  {
    name: "The Pragmatic Programmer",
    author: "David Thomas, Andrew Hunt",
    description: "Your journey to mastery. Straight from the programming trenches, this classic guide will help you become a better programmer through practical advice that applies to all aspects of software development.",
    price: 155.00,
    image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1401432508i/4099.jpg",
    category: "Technology",
    stock_quantity: 35
  },
  {
    name: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    description: "The big ideas behind reliable, scalable, and maintainable systems. Navigate the diverse and fast-changing landscape of technologies for storing and processing data.",
    price: 175.00,
    image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1415816873i/23463279.jpg",
    category: "Technology",
    stock_quantity: 20
  },
  {
    name: "Man's Search for Meaning",
    author: "Viktor E. Frankl",
    description: "Psychiatrist Viktor Frankl's memoir about surviving Nazi concentration camps has riveted generations of readers with its descriptions of life in the camps and its lessons for spiritual survival.",
    price: 58.00,
    image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1535419394i/4069.jpg",
    category: "Psychology",
    stock_quantity: 45
  },
  {
    name: "Meditations",
    author: "Marcus Aurelius",
    description: "The personal writings of the Roman Emperor Marcus Aurelius, offering timeless Stoic wisdom and philosophical reflections. A guide to living with virtue, self-discipline, and tranquility.",
    price: 48.00,
    image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1421618636i/30659.jpg",
    category: "Philosophy",
    stock_quantity: 50
  },
  {
    name: "All the Light We Cannot See",
    author: "Anthony Doerr",
    description: "Set during World War II, this novel follows a blind French girl and a German boy whose paths collide in occupied France. A luminous, deeply moving story about people trying to be good in a terrible time.",
    price: 68.00,
    image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1451445646i/18143977.jpg",
    category: "Historical Fiction",
    stock_quantity: 40
  },
  {
    name: "The Seven Husbands of Evelyn Hugo",
    author: "Taylor Jenkins Reid",
    description: "Aging Hollywood icon Evelyn Hugo finally tells her story to unknown journalist Monique Grant. As Evelyn unfolds her seven marriages, Monique begins to understand the devastating price of fame.",
    price: 64.00,
    image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1618461969i/32620332.jpg",
    category: "Historical Fiction",
    stock_quantity: 35
  },
  {
    name: "Tomorrow, and Tomorrow, and Tomorrow",
    author: "Gabrielle Zevin",
    description: "Two friends, Sam and Sadie, build video games together and create worlds where they can find their best selves. A love story about creativity, ambition, identity, and the complexities of human connection.",
    price: 82.00,
    image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1636978687i/58784475.jpg",
    category: "Fiction",
    stock_quantity: 30
  },
  {
    name: "Normal People",
    author: "Sally Rooney",
    description: "Connell and Marianne grow up in the same small town in Ireland, but come from different worlds. An exquisite story about mutual fascination, friendship, and love during their years at Trinity College.",
    price: 58.00,
    image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1571423190i/41057294.jpg",
    category: "Fiction",
    stock_quantity: 40
  },
  {
    name: "The Lean Startup",
    author: "Eric Ries",
    description: "A new approach to business that's being adopted globally. The Lean Startup method teaches you how to drive a startup, how to steer, when to turn, and when to persevere—and grow with maximum acceleration.",
    price: 82.00,
    image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1333576876i/10127019.jpg",
    category: "Business",
    stock_quantity: 35
  },
  {
    name: "Range",
    author: "David Epstein",
    description: "Why generalists triumph in a specialized world. Epstein examined the world's most successful athletes, artists, musicians, inventors, and scientists, and discovered that generalists often find their path late.",
    price: 75.00,
    image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1550048292i/41795733.jpg",
    category: "Self-Help",
    stock_quantity: 40
  },
  {
    name: "The Way of Kings",
    author: "Brandon Sanderson",
    description: "Roshar is a world of stone and storms. The first book of The Stormlight Archive introduces us to a world of magic, mystery, and war. An epic fantasy masterpiece that redefines the genre.",
    price: 125.00,
    image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1388184640i/7235533.jpg",
    category: "Fantasy",
    stock_quantity: 20
  },
  {
    name: "The Hobbit",
    author: "J.R.R. Tolkien",
    description: "Bilbo Baggins enjoys a comfortable life until the wizard Gandalf and thirteen dwarves arrive on his doorstep. The classic prelude to The Lord of the Rings, perfect for readers discovering Middle-earth.",
    price: 68.00,
    image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1546071216i/5907.jpg",
    category: "Fantasy",
    stock_quantity: 50
  },
  {
    name: "Cosmos",
    author: "Carl Sagan",
    description: "A classic work of popular science that has inspired millions of readers. Sagan takes us on an unforgettable journey through space and time, exploring the universe and our place within it.",
    price: 72.00,
    image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1388370268i/55030.jpg",
    category: "Science",
    stock_quantity: 30
  },
  {
    name: "When Breath Becomes Air",
    author: "Paul Kalanithi",
    description: "A neurosurgeon faces terminal cancer at age thirty-six. This powerful memoir explores what makes a life worth living when faced with mortality, written with profound insight and grace.",
    price: 62.00,
    image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1492677644i/25899336.jpg",
    category: "Biography",
    stock_quantity: 35
  },
  {
    name: "1984",
    author: "George Orwell",
    description: "A dystopian masterpiece set in a totalitarian future where Big Brother watches everything. Winston Smith works rewriting history, but his own memories threaten his survival in this prophetic classic.",
    price: 52.00,
    image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1657781256i/61439040.jpg",
    category: "Fiction",
    stock_quantity: 55
  },
  {
    name: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    description: "The quintessential Jazz Age novel. Nick Carraway's story of the mysterious millionaire Jay Gatsby and his obsession with Daisy Buchanan captures the essence of 1920s America.",
    price: 45.00,
    image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1490528560i/4671.jpg",
    category: "Fiction",
    stock_quantity: 60
  }
];

async function seedProducts() {
  try {
    console.log('🌱 Starting database seeding...');

    // Check if products already exist
    const existingProducts = await pool.query('SELECT COUNT(*) FROM products');
    const count = parseInt(existingProducts.rows[0].count);

    if (count > 0) {
      console.log(`⚠️  Database already has ${count} products. Skipping seeding.`);
      console.log('💡 To re-seed, manually delete products: DELETE FROM products;');
      process.exit(0);
    }

    // Insert products
    for (const product of products) {
      await pool.query(
        'INSERT INTO products (name, price, category, image, stock_quantity, description) VALUES ($1, $2, $3, $4, $5, $6)',
        [product.name, product.price, product.category, product.image, product.stock_quantity, product.description]
      );
    }

    console.log(`✅ Successfully seeded ${products.length} products!`);
    console.log('📚 Products are now available in the database.');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedProducts();
