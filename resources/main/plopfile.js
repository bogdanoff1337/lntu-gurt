import { camelCase, pascalCase } from "change-case";

export default function (plop) {
  const layers = ['entity', 'feature', 'page'];


  plop.setHelper('pascalCase', (text) => pascalCase(text))
  plop.setHelper('camelCase', (text) => camelCase(text))

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
        const layerPath = () => {
            if (data.layer === 'entity') {
                return 'entities';
            }
            
            if (data.layer === 'feature') {
                return 'features';
            }
            
            if (data.layer === 'page') {
                return 'pages';
            }
        }

          const path = `src/${layerPath()}/${pascalCase(data.slice)}`;
          return [
              {
                type: 'add',
                path: `${path}/model/slice/{{layer}}{{slice}}Slice.ts`,
                templateFile: 'plop-templates/Slice/model/slices/layerSliceSlice.ts.hbs'
              },
              {
                type: 'add',
                path: `${path}/model/types/{{pascalCase layer}}{{pascalCase slice}}Schema.ts`,
                templateFile: 'plop-templates/Slice/model/types/LayerSliceSchema.ts.hbs'
              },
              {
                type: 'add',
                path: `${path}/model/services/{{camelCase slice}}Api.ts`,
                templateFile: 'plop-templates/Slice/model/services/sliceApi.ts.hbs'
              },
              {
                type: 'add',
                path: `${path}/ui/{{pascalCase slice}}/{{pascalCase slice}}.tsx`,
                templateFile: 'plop-templates/Slice/ui/Slice/Slice.tsx.hbs'
              },
              {
                type: 'add',
                path: `${path}/ui/{{pascalCase slice}}/{{pascalCase slice}}.module.scss`,
                templateFile: 'plop-templates/Slice/ui/Slice/Slice.module.scss.hbs'
              },
              {
                type: 'add',
                path: `${path}/model/selectors/index.ts`,
                templateFile: 'plop-templates/Slice/model/selectors/index.ts.hbs'
              },
              {
                type: 'add',
                path: `${path}/index.ts`,
                templateFile: 'plop-templates/Slice/index.ts.hbs'
              },
          ];
      }
  });
};
