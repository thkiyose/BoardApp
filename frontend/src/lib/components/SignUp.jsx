import React from 'react';
import styled from 'styled-components'
import { useForm } from 'react-hook-form';
import Color from './common/Color';

export const SignUp = () => {
    const { register, handleSubmit } = useForm();

    const onSubmit = data => console.log(data);

    return (
        <Div>
            <h1>アカウント登録</h1>
            <FormDiv>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <p><label>ユーザーID</label></p>
                    <input {...register("publicId")} />
                    <p><label>メールアドレス</label></p>
                    <input {...register("email")} />
                    <p><label>パスワード</label></p>
                    <input {...register("password")} />
                    <p><label>パスワード(確認)</label></p>
                    <input {...register("passwordConfirmation")} />
                    <p><button type="submit" >登録</button></p>
                </form>
            </FormDiv>
        </Div>
    )
}

const Div = styled.div`
    margin:0 auto; 

    h1 {
        margin:0 auto;
        text-align: center;
    }

`

const FormDiv = styled.div`
    @media (max-width: 425px) {
        max-width:100%;
    }
    max-width: 50%;
    margin: 0 auto;
    form {
        p {
            margin-bottom: 5px;
        }
        input {
            width: 100%;
            box-sizing: border-box;
            border: solid 1px gray;
            padding: 10px;
        }
        button {
            display: block;
            background-color: ${Color.primary};
            color: white;
            border: none;
            padding: 10px;
            margin: 0 auto;
            width: 100%;
        }
    }
`