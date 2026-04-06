# LinkIt
디지털로 명함을 생성, 주고받을 수 있는 REST와 React 기반의 개인 웹 프로젝트

# 1. 요구&분석
## 1-1. 프로젝트 배경
최근 다양한 '디지털 명함' 서비스가 출시되고 있으나, 아직까지 명함의 디지털 전환은 이루어지지 않고 있다.  
따라서 해당 프로젝트를 통해 어느 정도의 인지도를 가지고 있는 디지털 명함 서비스들의 장/단점을 분석, *어째서 사람들이 여전히 종이 명함을 선호하는지*에 대해서와 *디지털 전환을 위해 반드시 필요한 기능은 무엇인지* 찾아내어 이를 해결할 수 있는 디지털 명함 서비스를 제공하고자 한다. 

## 1-2. 프로젝트 목표
- 기업 내지는 프리랜서까지도, **명함을 사용해야 하는 모든 사람이** 편하게 사용할 수 있는 디지털 명함 서비스 제공
- REST api를 기반으로 한 데이터 제공과 React 기반의 사용자 인터페이스 제공

## 1-3. 기능 요구사항
- **Google OAuth 2.0**을 통한 소셜 로그인/로그아웃
- 사용자는 이름, 회사명, 연락처 등의 필수 정보를 입력하여 디지털 명함을 제작
- 생성된 명함은 공유 링크를 통해 QR코드로 공유하거나 PNG로 공유
- 명함첩 중복 저장 예외 처리

## 1-4. 비기능 요구사항
- React를 통한 **모바일 환경 및 데스크톱 환경 사용**
- 지연 없이 신속한 데이터 교환

## 1-5. 유스케이스
![image](https://blog.kakaocdn.net/dna/cEzRtO/dJMcaaLChMH/AAAAAAAAAAAAAAAAAAAAAI-iS9-4uWB1BZVtDkgQzNlngVUIfe3JomQZWXY1bKIV/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1777561199&allow_ip=&allow_referer=&signature=MwJ4%2B9Z5CxQ40wbYmmVWWu6zKqs%3D)

# 2. 설계
## 2-1. 시스템 아키텍쳐
- Frontend : React
- Backend : Java (Spring Boot)
- Database : MariaDB
- Auth : OAuth 2.0 (Google Login Api)

## 2-2. 주 기능
- [x] 로그인 / 로그아웃
- [x] 명함 제작
- [x] 명함 교환
- [x] 교환받은 명함 확인

## 2-3. 데이터베이스 설계 (ERD)  
![image](https://blog.kakaocdn.net/dna/diqlbO/dJMcacJr1nG/AAAAAAAAAAAAAAAAAAAAAKIxQLdpLmHVdf3IfbifvNq0jXYf7oDqUCB7Eq_gqXvH/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1777561199&allow_ip=&allow_referer=&signature=ltddqM4LtUUwb2%2F7hW0W%2FoBR6S0%3D)

# 3. 테스트 시나리오
원활한 테스트를 위해 구글 계정 2개를 필요로 한다.

## 3-1. 웹 접속, 로그인/로그아웃
웹 어플리케이션에 접속, 로그인/로그아웃 기능이 제대로 작동하고 있는지 확인한다. 
*로그인하지 않은 경우 로그인 화면만 띄워진다.*
1. 웹 브라우저 실행
2. 웹 어플리케이션 접속  
![image](https://blog.kakaocdn.net/dna/kKA2i/dJMcabcEHOb/AAAAAAAAAAAAAAAAAAAAAIO3nzXwcD5X8-YCvJ2MDDKv23JKcjDfQt_2uDU2YRJp/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1777561199&allow_ip=&allow_referer=&signature=wXic3Exq%2FFN%2FuLFn0pmMLk2ZJQA%3D)
3. 계정 1 로그인  
![image](https://blog.kakaocdn.net/dna/bjOQ2K/dJMcabX3GZP/AAAAAAAAAAAAAAAAAAAAABrOdto0KiBhewm7hE284btcGx66TDSHi6W-HvK8eqMh/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1777561199&allow_ip=&allow_referer=&signature=IDscIzcRi7Kd%2FX23UDJ6k%2FOoGuc%3D)
4. 로그아웃  
![image](https://blog.kakaocdn.net/dna/kKA2i/dJMcabcEHOb/AAAAAAAAAAAAAAAAAAAAAIO3nzXwcD5X8-YCvJ2MDDKv23JKcjDfQt_2uDU2YRJp/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1777561199&allow_ip=&allow_referer=&signature=wXic3Exq%2FFN%2FuLFn0pmMLk2ZJQA%3D)

## 3-2. 명함 제작
웹 어플리케이션에 로그인한 상태로 명함 카드를 제작한다. 
1. 계정 1 로그인
2. 필수 입력값 (이름, 영어 이름, 회사 로고, 회사명, 휴대전화 번호, 이메일 주소, 회사 주소) 입력  
![image](https://blog.kakaocdn.net/dna/m9P1Y/dJMcajaFWoW/AAAAAAAAAAAAAAAAAAAAACbpbBLpPjwcJTktIpTTJh-1pLbVXgcnPxhF9uwbdRdu/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1777561199&allow_ip=&allow_referer=&signature=CzF5qVti3%2FiJbVeikwzcMniaSA8%3D)
4. 완료 버튼 클릭
5. '마이 페이지' 에서 '내 명함' 에 들어가 제작한 명함 확인  
![image](https://blog.kakaocdn.net/dna/da4N4x/dJMcafF90Y3/AAAAAAAAAAAAAAAAAAAAAIZRUcoRRHsWLi9SxIpMUYIA_QEbpOFlc4VX63OrQNas/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1777561199&allow_ip=&allow_referer=&signature=92UemxSp5iEntOZXVbd6dBcAVpU%3D)
*해당 서비스를 이용하지 않는 사람에게도 명함을 줄 수 있게, PNG로 다운로드받는 버튼을 만들어 해당 버튼의 작동도 확인한다.*

## 3-3. 명함 교환
타 계정으로 로그인하여 명함 카드를 교환받는다. 
*이미 교환되어 '받은 명함'에 들어가 있는 명함의 경우, QR코드 스캔 시에도 명함이 '받은 명함'에 중복되어 들어가지 않도록 예외로 구현한다.*
1. '공유 링크 생성' 버튼 클릭  
![image](https://blog.kakaocdn.net/dna/TXvA0/dJMcagygLK3/AAAAAAAAAAAAAAAAAAAAAAnjjkPC67RpXyr1Svnrj5CH_qpGeUlvFwAVbTeKjkC_/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1777561199&allow_ip=&allow_referer=&signature=V439UdtjNlnjq1SNTWJp93vgK1k%3D)
2.  QR, png, 공유 링크 저장
3. 로그아웃
4. 계정 2 로그인
5. 명함 교환 확인  
![image](https://blog.kakaocdn.net/dna/BFWiP/dJMcagygLMh/AAAAAAAAAAAAAAAAAAAAAErblPFNExFLVt7o93CMx1kf3dB3GdlTw1qF4d0syVTL/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1777561199&allow_ip=&allow_referer=&signature=3j%2Bi3K3WuhqAppfMc0ogqtggb78%3D)

## 3-4. 교환받은 명함 메모
교환받은 명함과 저장된 날짜를 확인하고, 기타 메모를 작성한다. 
1. '마이 페이지'에서 '받은 명함'에 들어가 받은 명함 확인
2. 명함 우측의 메모 아이콘을 눌러 메모 작성

# 4. 프로젝트 보고서
해당 프로젝트는 React와 RESTapi의 이해와 MariaDB와의 연결을 통해 부족한 백엔드 지식을 늘리는 것을 목표로 둔다. 

## 4-1. 1주차
### 서비스 요구사항 명세화, 데이터 관계 정의
- ✓ REST api 설계  
  [API 설계 Notion](https://www.notion.so/API-325ecae04594800db824fac71cdcb622?source=copy_link)
- ✓ 개발 환경 구축
- ✓ 사용자, 명함, 교환 이력 등 ERD 설계

  <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2FbYq3WA%2FdJMcac3p7vQ%2FAAAAAAAAAAAAAAAAAAAAAJQ7EeQhxJc62Y5MhNejz2EBshdhTc0KJoEqihhiMW1v%2Fimg.png%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1774969199%26allow_ip%3D%26allow_referer%3D%26signature%3DhtOHYOwid2yZfqZykyhG8AxJuJw%253D">

**참고자료**  
[[MariaDB] MariaDB 설치 및 DBeaver 연동](https://developlsb2dwb.tistory.com/26)  
이고잉. 『생활코딩! 리액트 프로그래밍』. 위키북스, 2021  
[개발 초보를 위한 RESTful API 설계 가이드](https://velog.io/@couchcoding/%EA%B0%9C%EB%B0%9C-%EC%B4%88%EB%B3%B4%EB%A5%BC-%EC%9C%84%ED%95%9C-RESTful-API-%EC%84%A4%EA%B3%84-%EA%B0%80%EC%9D%B4%EB%93%9C)  
[[Java] RESTful API 설계 방법 -2 : 구성하기](https://adjh54.tistory.com/151)

## 4-2. 2주차
### 인터페이스 구현 및 로직 개발
- ✓ Google OAuth 2.0을 이용하여 로그인/로그아웃 구현
- ✓ React 컴포넌트 기반의 프론트 및 명함 제작 UI 구현
- ✓ 데이터베이스 구현

**참고자료**  
[[개발일지 #011] Oauth 로그인 구현 (구글)](https://ddururiiiiiii.tistory.com/618)


## 4-3. 3주차
### QR 코드 기반 교환 시스템 구현
- ✓ 프론트엔드 구현
- ✓ QR코드 생성 및 다운로드 기능 구현
- ✓ 교환된 명함 정보 저장 기능 구현

**참고자료**  
[[React] 리액트 QR 코드 생성하기 (qrcode.react)](https://hyunki99.tistory.com/117)


## 4-4. 4주차
### 추가 편의성 개선
- ✓ 전체 서비스 테스트 및 버그 수정
- 서버 및 도메인 연결
- 공유된 명함에 메모 기능 구현
- 명함 정보 수정 기능 구현



## 5. 결론
### 작업 결과
- **QR코드** 및 **PNG** 저장 기능으로 **온라인/오프라인 및 서비스 가입 여부에 제한 없이** 어디에서도 사용할 수 있는 환경 구축
- 교환된 명함을 탭을 닫는 것만으로 사라지게 하지 않고, **명함첩에 저장**하여 보관 및 관리에 편의성
- React와 Java(Spring Boot) 사이의 **데이터 통신 구조에 대한 학습**
### 한계점, 보완 사항
- 기본적으로 명함 서비스에 필요한 기능에 집중하기 위해 '친구'기능을 통한 타인의 명함 공유 기능을 포기했음에도 React와 Java(Spring Boot)를 처음 사용함에 따라 코드에 오류가 많았고 개발 일정 관리에 실패
- 입력한 명함 정보의 수정기능, 명함을 공유받은 시간과 메모를 작성하는 기능들 미구현 
### 향후 계획
- 서버 및 도메인 연결
- 공유된 명함에 메모 기능 구현
- 명함 정보 수정 기능 구현
- OCR을 통한 기존 명함 정보 저장 구현
