import styled from 'styled-components/macro';

const StyledInvalidUser = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Check = () => (
  <StyledInvalidUser>
    <div className="invalid-user">
    <h1>無効なユーザー</h1>
    <p>
        現在利用できるアカウントを制限しています。<br></br>
        テストにご協力いただける方は開発者までご連絡ください。
    </p>
    </div>
  </StyledInvalidUser>
);

export default Check;