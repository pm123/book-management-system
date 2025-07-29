// 模拟延迟
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// 模拟图书数据
let books = [
  {
    id: '1',
    title: '三体',
    author: '刘慈欣',
    publisher: '重庆出版社',
    category: '科幻',
    description: '地球文明向宇宙发出的一声啼鸣，以及以此为开端，地球文明与三体文明间的恩怨情仇。',
    price: 23.00,
    cover: 'https://img1.doubanio.com/view/subject/s/public/s2768378.jpg',
    publicationDate: '2008-01-01',
    isbn: '9787536692930',
    pages: 302
  },
  {
    id: '2',
    title: '百年孤独',
    author: '加西亚·马尔克斯',
    publisher: '南海出版公司',
    category: '魔幻现实主义',
    description: '讲述了布恩迪亚家族七代人的传奇故事，以及加勒比海沿岸小镇马孔多的百年兴衰。',
    price: 39.50,
    cover: 'https://img2.doubanio.com/view/subject/s/public/s6384944.jpg',
    publicationDate: '2011-06-01',
    isbn: '9787544253994',
    pages: 360
  },
  {
    id: '3',
    title: '活着',
    author: '余华',
    publisher: '作家出版社',
    category: '当代文学',
    description: '讲述了农村人福贵悲惨的人生遭遇。福贵本是个阔少爷，可他嗜赌如命，终于赌光了家业。',
    price: 20.00,
    cover: 'https://img9.doubanio.com/view/subject/s/public/s29053580.jpg',
    publicationDate: '2012-08-01',
    isbn: '9787506365437',
    pages: 191
  },
  {
    id: '4',
    title: '解忧杂货店',
    author: '东野圭吾',
    publisher: '南海出版公司',
    category: '治愈系小说',
    description: '在僻静的街道旁，有一家特别的杂货店，只要在晚上把写下烦恼的信投进店后门的牛奶箱，第二天就会在箱子里得到回答。',
    price: 39.50,
    cover: 'https://img9.doubanio.com/view/subject/s/public/s27264181.jpg',
    publicationDate: '2014-05-01',
    isbn: '9787544270878',
    pages: 291
  },
  {
    id: '5',
    title: '人类简史',
    author: '尤瓦尔·赫拉利',
    publisher: '中信出版社',
    category: '历史',
    description: '十万年前，地球上至少有六种不同的人。但今日，只剩下了我们自己——智人。我们曾经只是非洲角落一个毫不起眼的族群，对地球上的生态系统也没有太大的影响力。',
    price: 68.00,
    cover: 'https://img9.doubanio.com/view/subject/s/public/s27814883.jpg',
    publicationDate: '2014-11-01',
    isbn: '9787508647357',
    pages: 440
  }
]

// 获取所有图书
export async function getBooks() {
  await delay(300) // 模拟网络延迟
  return [...books]
}

// 根据ID获取图书
export async function getBookById(id) {
  await delay(200)
  const book = books.find(book => book.id === id)
  if (!book) {
    throw new Error('图书不存在')
  }
  return { ...book }
}

// 添加图书
export async function addBook(bookData) {
  await delay(300)
  const newBook = {
    ...bookData,
    id: String(Date.now()), // 使用时间戳作为ID
  }
  books.push(newBook)
  return { ...newBook }
}

// 更新图书
export async function updateBook(id, bookData) {
  await delay(300)
  const index = books.findIndex(book => book.id === id)
  if (index === -1) {
    throw new Error('图书不存在')
  }
  
  const updatedBook = {
    ...books[index],
    ...bookData,
    id // 确保ID不变
  }
  
  books[index] = updatedBook
  return { ...updatedBook }
}

// 删除图书
export async function deleteBook(id) {
  await delay(300)
  const index = books.findIndex(book => book.id === id)
  if (index === -1) {
    throw new Error('图书不存在')
  }
  
  books.splice(index, 1)
  return true
}

// 搜索图书
export async function searchBooks(query) {
  await delay(300)
  if (!query) {
    return [...books]
  }
  
  const lowerQuery = query.toLowerCase()
  return books.filter(book => 
    book.title.toLowerCase().includes(lowerQuery) ||
    book.author.toLowerCase().includes(lowerQuery) ||
    book.publisher.toLowerCase().includes(lowerQuery) ||
    book.category.toLowerCase().includes(lowerQuery) ||
    book.description.toLowerCase().includes(lowerQuery)
  )
}