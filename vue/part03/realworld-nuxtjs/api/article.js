import { request } from '@/plugins/request'

// 获取文章列表
export const getArticle = params =>{
  return request({
    method:'GET',
    url:'/api/articles',
    params
  })
}

// 获取关注文章列表
export const getArticleFeed = params =>{
  return request({
    method:'GET',
    url:'/api/articles/feed',
    // headers:{
    //   Authirization:`Token ${}`
    // },
    params
  })
}

// 点赞
export const addFavorite = slug =>{
  return request({
    method:'POST',
    url:`/api/articles/${slug}/favorite`
  })
}

// 取消点赞
export const deleteFavorite = slug =>{
  return request({
    method:'DELETE',
    url:`/api/articles/${slug}/favorite`
  })
}

// 获取文章详情
export const getArticleDetail = slug =>{
  return request({
    method:'GET',
    url:`/api/articles/${slug}`
  })
}


// 获取文章评论
export const getCommonts = slug =>{
  return request({
    method:'GET',
    url:`/api/articles/${slug}/comments`
  })
}