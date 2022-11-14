<template>
  <div>
    <form class="card comment-form">
      <div class="card-block">
        <textarea
          class="form-control"
          placeholder="Write a comment..."
          rows="3"
        ></textarea>
      </div>
      <div class="card-footer">
        <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
        <button class="btn btn-sm btn-primary">Post Comment</button>
      </div>
    </form>

    <div class="card" v-for="comment in comments" :key="comment.id">
      <div class="card-block">
        <p class="card-text">
        {{comment.body}}
        </p>
      </div>
      <div class="card-footer">
        <nuxt-link :to="{
          name:'profile',
          params:{
            username: comment.author.username
          }
        }" class="comment-author">
          <img
            :src="comment.author.image"
            class="comment-author-img"
          />
        </nuxt-link>
        &nbsp;
        <nuxt-link :to="{
          name:'profile',
          params:{
            username: comment.author.username
          }
        }" class="comment-author">{{ comment.author.username}}</nuxt-link>
        <span class="date-posted">{{ comment.createdAt | date}}</span>
      </div>
    </div>
 
  </div>
</template>

<script>
import { getCommonts } from "@/api/article";
export default {
  name: "ArticleComment",
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      comments: [],
    };
  },
  async mounted() {
    const { data } = await getCommonts(this.article.slug);
    this.comments = data.comments
  },
};
</script>

<style lang="scss" scoped>
</style>