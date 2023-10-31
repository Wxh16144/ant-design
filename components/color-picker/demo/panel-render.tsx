import React from 'react';
import { Col, ColorPicker, Divider, Row, Space, theme } from 'antd';
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

const HorizontalLayoutDemo = () => {
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

  const customPanelRender: ColorPickerProps['panelRender'] = (
    _,
    { components: { Picker, Presets } },
  ) => (
    <Row justify="space-between">
      <Col span={12}>
        <Presets />
      </Col>
      <Divider type="vertical" style={{ height: 'auto' }} />
      <Col flex="auto">
        <Picker />
      </Col>
    </Row>
  );

  return (
    <ColorPicker
      open
      styles={{ popupOverlayInner: { width: 480 } }}
      presets={presets}
      panelRender={customPanelRender}
    />
  );
};

const BasicDemo = () => (
  <ColorPicker
    panelRender={(panel) => (
      <div className="custom-panel">
        <div
          style={{
            fontSize: 12,
            color: 'rgba(0, 0, 0, 0.88)',
            lineHeight: '20px',
            marginBottom: 8,
          }}
        >
          Color Picker
        </div>
        {panel}
      </div>
    )}
  />
);

export default () => (
  <Space direction="vertical">
    <Space>
      <span>Add title:</span>
      <BasicDemo />
    </Space>
    <Space>
      <span>Horizontal layout:</span>
      <HorizontalLayoutDemo />
    </Space>
  </Space>
);
