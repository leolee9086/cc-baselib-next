import { defineComponent, openBlock, createBlock, createVNode } from 'vue';

var script = defineComponent({
  name: "Medal"
});

const _hoisted_1 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
};
const _hoisted_2 = /* @__PURE__ */ createVNode("path", {
  fill: "currentColor",
  d: "M512 896a256 256 0 1 0 0-512 256 256 0 0 0 0 512zm0 64a320 320 0 1 1 0-640 320 320 0 0 1 0 640z"
}, null, -1);
const _hoisted_3 = /* @__PURE__ */ createVNode("path", {
  fill: "currentColor",
  d: "M576 128H448v200a286.72 286.72 0 0 1 64-8c19.52 0 40.832 2.688 64 8V128zm64 0v219.648c24.448 9.088 50.56 20.416 78.4 33.92L757.44 128H640zm-256 0H266.624l39.04 253.568c27.84-13.504 53.888-24.832 78.336-33.92V128zM229.312 64h565.376a32 32 0 0 1 31.616 36.864L768 480c-113.792-64-199.104-96-256-96-56.896 0-142.208 32-256 96l-58.304-379.136A32 32 0 0 1 229.312 64z"
}, null, -1);
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("svg", _hoisted_1, [
    _hoisted_2,
    _hoisted_3
  ]);
}

script.render = render;
script.__file = "packages/components/Medal.vue";

export default script;
