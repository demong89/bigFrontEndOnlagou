<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>How to build webapps that scale</h1>

        <article-meta :article="article" />
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12" v-html="article.body"></div>
      </div>

      <hr />

      <div class="article-actions">
        <article-meta :article="article" />
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <article-comment :article="article" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticleDetail } from "@/api/article";
import MarkDown from "markdown-it";
import ArticleMeta from "./components/article-meta";
import ArticleComment from "./components/article-comment";
export default {
  name: "articleDetail",
  async asyncData({ params }) {
    const { data } = await getArticleDetail(params.slug);
    console.log(data);
    const { article } = data;
    article.body = new MarkDown().render(article.body);
    return {
      article,
    };
  },
  components: {
    ArticleMeta,
    ArticleComment,
  },
  head() {
    return {
      title: `${this.article.title} - 柒月`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.article.description,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
</style>