import React from 'react';
import { ColorPicker, theme } from 'antd';
import type { ColorPickerProps } from 'antd';
import { generate, green, presetPalettes, red } from '@ant-design/colors';
import { upperFirst } from 'lodash';
import { TinyColor } from '@ctrl/tinycolor';

type Presets = Required<ColorPickerProps>['presets'][number];

const genPresets = (presets = presetPalettes) =>
  Object.entries(presets).map<Presets>(([label, colors]) => ({
    label: upperFirst(label),
    colors: [
      ...colors,
      ...colors.map(
        // Add transparency
        (color, idx) => new TinyColor(color).setAlpha(idx / 10).toHex8String(),
      ),
    ],
  }));

export default () => {
  const { token } = theme.useToken();

  const presets = React.useMemo(
    () =>
      genPresets({
        primary: generate(token.colorPrimary),
        red,
        green,
      }),
    [token.colorPrimary],
  );

  return <ColorPicker presets={presets} />;
};
