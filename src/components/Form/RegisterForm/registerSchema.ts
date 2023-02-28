/* eslint-disable import/no-extraneous-dependencies */
import * as yup from "yup"

export const formRegisterSchema = yup.object().shape({
    name: yup.string().required("Digite seu nome!"),
    email: yup.string().required("Email obrigatório!").email("Email invalido!"),
    password: yup.string().required("Digite a senha!"),
    confirmpassword: yup.string().oneOf([yup.ref("password")],"Falha na confirmação da senha!").required("Confirme a senha!")
  })