// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer/source-files";
var Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: "**/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    tags: { type: "list", of: { type: "string" } }
    // 기타 필요한 필드들...
  }
  // 다른 필드 및 설정 추가...
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "posts",
  // 또는 MDX 파일이 위치한 폴더
  documentTypes: [Post],
  disableImportAliasWarning: true
});
export {
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-34A6LR42.mjs.map
