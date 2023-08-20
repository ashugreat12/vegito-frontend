import netherlandsRecruiter from './vegito 2-modified.png';
import * as S from './style';

const Recruiter = () => (
  <S.Container>
    <S.Thumbnail>
      <img
        alt="Jeremy Akeze - Doghouse IT Recruitment"
        src={netherlandsRecruiter}
      />
    </S.Thumbnail>
    <S.Description>
      <h4 style={{paddingLeft:"4%",fontSize:"0.9rem"}}>
     See & Buy , Return at Same Time
        <S.Flag />
      </h4>
      <p style={{paddingLeft:"4%",fontSize:"80%", marginTop:"2%"}}>
       See at Your Door,You can Return any vegetables if you don't like them,
        with See & Buy!"
        <br></br>
        <a style={{marginLeft:"80%",fontSize:"90%",}} href="">
          <b>Vegito</b>
        </a>
      </p>
    </S.Description>
  </S.Container>
);

export default Recruiter;
