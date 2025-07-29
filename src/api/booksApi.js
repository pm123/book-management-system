import api from './api';

/**
 * 获取所有图书
 * @param {Object} params - 查询参数 (page, limit, sortField, sortOrder)
 * @returns {Promise} - 返回图书列表
 */
export async function getBooks(params = {}) {
  try {
    const response = await api.get('/books', { params });
    return response || { data: [] };
  } catch (error) {
    console.error('获取图书列表失败:', error);
    throw new Error('获取图书列表失败');
  }
}

/**
 * 根据ID获取图书
 * @param {String} id - 图书ID
 * @returns {Promise} - 返回图书详情
 */
export async function getBookById(id) {
  try {
    const response = await api.get(`/books/${id}`);
    return response;
  } catch (error) {
    console.error(`获取图书详情失败 (ID: ${id}):`, error);
    throw new Error('图书不存在');
  }
}

/**
 * 添加图书
 * @param {Object} bookData - 图书数据
 * @returns {Promise} - 返回新创建的图书
 */
export async function addBook(bookData) {
  try {
    const response = await api.post('/books', bookData);
    return response;
  } catch (error) {
    console.error('添加图书失败:', error);
    throw new Error('添加图书失败');
  }
}

/**
 * 更新图书
 * @param {String} id - 图书ID
 * @param {Object} bookData - 图书数据
 * @returns {Promise} - 返回更新后的图书
 */
export async function updateBook(id, bookData) {
  try {
    const response = await api.put(`/books/${id}`, bookData);
    return response;
  } catch (error) {
    console.error(`更新图书失败 (ID: ${id}):`, error);
    throw new Error('更新图书失败');
  }
}

/**
 * 删除图书
 * @param {String} id - 图书ID
 * @returns {Promise} - 返回删除结果
 */
export async function deleteBook(id) {
  try {
    await api.delete(`/books/${id}`);
    return true;
  } catch (error) {
    console.error(`删除图书失败 (ID: ${id}):`, error);
    throw new Error('删除图书失败');
  }
}

/**
 * 搜索图书
 * @param {String} query - 搜索关键词
 * @returns {Promise} - 返回搜索结果
 */
export async function searchBooks(query) {
  try {
    const response = await api.get('/books', { params: { query } });
    return response || { data: [] };
  } catch (error) {
    console.error('搜索图书失败:', error);
    throw new Error('搜索图书失败');
  }
}