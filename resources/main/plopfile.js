import { camelCase, pascalCase } from "change-case";

export default function (plop) {
  const layers = ['entity', 'feature', 'page'];

  // Registering helpers for case conversion
  plop.setHelper('pascalCase', (text) => pascalCase(text));
  plop.setHelper('camelCase', (text) => camelCase(text));

  // Helper function to determine the folder path based on the layer
  const getLayerPath = (layer) => {
    switch (layer) {
      case 'entity':
        return 'entities';
      case 'feature':
        return 'features';
      case 'page':
        return 'pages';
      default:
        throw new Error(`Unknown layer: ${layer}`);
    }
  };

  // Template paths
  const templates = {
    slice: 'plop-templates/Slice/model/slices/layerSliceSlice.ts.hbs',
    schema: 'plop-templates/Slice/model/types/LayerSliceSchema.ts.hbs',
    api: 'plop-templates/Slice/model/services/sliceApi.ts.hbs',
    uiComponent: 'plop-templates/Slice/ui/Slice/Slice.tsx.hbs',
    uiStyles: 'plop-templates/Slice/ui/Slice/Slice.module.scss.hbs',
    selectors: 'plop-templates/Slice/model/selectors/index.ts.hbs',
    index: 'plop-templates/Slice/index.ts.hbs'
  };

  // Generator for creating a new slice
  plop.setGenerator('slice', {
    description: 'Create new slice',
    prompts: [
      {
        type: 'list',
        name: 'layer',
        message: 'Select layer:',
        choices: layers
      },
      {
        type: 'input',
        name: 'slice',
        message: 'Write name of slice:'
      },
    ],
    actions: function(data) {
      const layerPath = getLayerPath(data.layer);
      const basePath = `src/${layerPath}/${pascalCase(data.slice)}`;

      return [
        {
          type: 'add',
          path: `${basePath}/model/slices/{{layer}}{{slice}}Slice.ts`,
          templateFile: templates.slice
        },
        {
          type: 'add',
          path: `${basePath}/model/types/{{pascalCase layer}}{{pascalCase slice}}Schema.ts`,
          templateFile: templates.schema
        },
        {
          type: 'add',
          path: `${basePath}/model/services/{{camelCase slice}}Api.ts`,
          templateFile: templates.api
        },
        {
          type: 'add',
          path: `${basePath}/ui/{{pascalCase slice}}/{{pascalCase slice}}.tsx`,
          templateFile: templates.uiComponent
        },
        {
          type: 'add',
          path: `${basePath}/ui/{{pascalCase slice}}/{{pascalCase slice}}.module.scss`,
          templateFile: templates.uiStyles
        },
        {
          type: 'add',
          path: `${basePath}/model/selectors/index.ts`,
          templateFile: templates.selectors
        },
        {
          type: 'add',
          path: `${basePath}/index.ts`,
          templateFile: templates.index
        },
      ];
    }
  });
}