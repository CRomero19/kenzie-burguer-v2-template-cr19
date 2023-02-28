/* eslint-disable import/no-extraneous-dependencies */
import * as yup from "yup"

export const formLoginSchema = yup.object().shape({
    email: yup.string().required(` Email obrigatório!`).email(` Email invalido!`),
    password: yup.string().required("Digite a senha!")
  })