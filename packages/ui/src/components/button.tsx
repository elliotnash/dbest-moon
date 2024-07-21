import { ValidComponent } from "solid-js"

import * as ButtonPrimitive from "@kobalte/core/button"
import { PolymorphicProps } from "@kobalte/core/polymorphic"

type ButtonProps<T extends ValidComponent = "button"> = ButtonPrimitive.ButtonRootProps<T>

const Button = <T extends ValidComponent = "button">(
  props: PolymorphicProps<T, ButtonProps<T>>
) => {
  const others = props as ButtonProps;
  return (
    <>
      <ButtonPrimitive.Root
        class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2" 
        {...others} >
      </ButtonPrimitive.Root>
    </>
  )
}

export type { ButtonProps }
export { Button }
