// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer/source-files";
var Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: "**/*.mdx"
  // 다른 필드 및 설정 추가...
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "posts",
  // 또는 MDX 파일이 위치한 폴더
  documentTypes: [Post]
});
export {
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-GDCBHEJF.mjs.map
