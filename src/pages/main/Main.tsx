import * as S from "./style"

export default function Main(props: { setPage: (page: "main" | "chat" | "game") => void }) {
  return (
    <S.MainLayout>
      <S.H1>welcome to pongpong !</S.H1>
      <S.TextBold>Our Team</S.TextBold>
      <S.TextBox>
        <S.Text>
          front-end | <S.Text featured>hossong sumsong</S.Text>
        </S.Text>
        <S.Text>
          back-end | <S.Text featured>seojin</S.Text>
        </S.Text>
      </S.TextBox>
    </S.MainLayout>
  )
}
