# Type Alias: FC\<P\>

> **FC**\<`P`\> = `FunctionComponent`\<`P`\>

Defined in: node\_modules/.pnpm/@types+react@19.2.14/node\_modules/@types/react/index.d.ts:1030

Represents the type of a function component. Can optionally
receive a type argument that represents the props the component
receives.

## Type Parameters

### P

`P` = \{ \}

The props the component accepts.

## See

[React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/function_components)

## Alias

for FunctionComponent

## Examples

```tsx
// With props:
type Props = { name: string }

const MyComponent: FC<Props> = (props) => {
 return <div>{props.name}</div>
}
```

```tsx
// Without props:
const MyComponentWithoutProps: FC = () => {
  return <div>MyComponentWithoutProps</div>
}
```
