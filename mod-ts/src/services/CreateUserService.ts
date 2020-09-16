interface techObject {
  title: string,
  experience: number
}
interface createUserData {
  name?: string ;
  email: string;
  password: string;
  techs: string[]
}

//techs: Array<string | techObject> - array no formato de string
//ou
//techs: string[]

export default function createUSer({name = '' , email, password}: createUserData) {
  const user = {
    name, email, password
  }
  return user
}

//1 forma de typar name = '' caso nao seja obrigatoria,
//se for obrigatoria é = email: string ou etc