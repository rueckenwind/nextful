import React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

import colors from '../../js/colors'
import times from '../../js/times'

const MAIL_ADDRESS = 'mail@rw-hl.de'

const Form = styled.form`
  display: grid;
  grid-gap: 0.75rem;
`

const inputBase = css`
  padding: 0.75rem;
  font-size: inherit;
  font-weight: inherit;
  border: 1px solid ${colors.blue};

  :focus {
    outline: 1px solid ${colors.blue};
  }
`

const Input = styled.input`
  width: 100%;
  ${inputBase}
`

const Textarea = styled.textarea`
  ${inputBase}
  min-height: 10rem;
`

const Button = styled.button`
  ${inputBase}
  color: #fff;
  text-transform: uppercase;
  cursor: pointer;
  background-color: ${colors.blue};
  border: 0;
  transition: background-color ${times.transition};

  :hover {
    background-color: ${colors.green};
  }
`

export const ContactForm = () => {
  return (
    <Form action={`https://formspree.io/${MAIL_ADDRESS}`} method="POST">
      <Input type="text" name="Name" placeholder="Ihr Name" />
      <Input type="email" name="E-Mail" placeholder="Ihre E-Mail" />
      <Textarea name="Text" placeholder="Ihre Nachricht" />
      <div>
        <Button type="submit">Absenden</Button>
      </div>
    </Form>
  )
}
