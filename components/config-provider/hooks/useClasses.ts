import { useContext } from 'react';
import type { ConfigConsumerProps } from '../context';
import { ConfigContext } from '../context';

const SEMANTIC_CLS = 'classNames';

/**
 * Normalize classNames
 * @params [ctxSemanticCls, propsSemanticCls, internalSemanticCls]
 * @example
 * ```tsx
 * interface AppProps {
 *   children?: React.ReactNode;
 *   classNames?: {
 *     root?: string;
 *     body?: string;
 *     wrap?: string;
 *     close?: string;
 *     closeIcon?: string;
 *   }
 * }
 *
 * function App(props: React.PropsWithChildren<AppProps>) {
 *   const { children, classNames } = props
 *
 *   // [ctxSemanticCls, propsSemanticCls, internalSemanticCls];
 *   const normalizeCls = useClasses('modal', classNames, {
 *     root: 'root',
 *     body: 'body'
 *   });
 *
 *   return (
 *     <YourComponent classNames={normalizeCls}>
 *       {children}
 *     </YourComponent>
 *   )
 * }
 * ```
 */
const useClasses = <C extends Record<PropertyKey, any>>(
  componentName: string,
  ...semanticCls: Array<C | undefined>
): C => {
  const configProvider = useContext(ConfigContext);
  const cpSemanticCls = (configProvider[componentName as keyof ConfigConsumerProps] as any)?.[
    SEMANTIC_CLS
  ];

  const composedCls: Record<PropertyKey, Set<string>> = {};

  semanticCls.forEach((cls) => {
    if (!cls) return;
    Object.keys(cls).forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(cls, key)) {
        composedCls[key] ??= new Set();
        composedCls[key].add(cpSemanticCls?.[key]);
        composedCls[key].add(cls[key]);
      }
    });
  });

  return Object.entries(composedCls).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: Array.from(value).join(' '),
    }),
    {} as C,
  );
};

export default useClasses;
