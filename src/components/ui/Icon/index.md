<img width="1548" height="789" alt="스크린샷 2025-07-11 203642" src="https://github.com/user-attachments/assets/667628f5-00c3-446c-95fa-d654ec284eef" />

개발자들을 위한 웹이다 보니, 프로젝트에는 다양한 기술스택들의 아이콘이 존재합니다. 
이러한 아이콘들을 사용할 떄 일반적인 방식처럼 개별적인 SVG파일로 저장한다면 개발자의 불필요한 수고와 코드의 반복이 예상되는 작업이였습니다. 
따라 해당 아이콘들을 어떻게 최적화하고 또, 아이콘의 디자인이 수정되거나 새로운 아이콘이 추가가 된다면 어떤 방식으로 효율적이게 개발을 해야할까 고민하였습니다. 

<img width="1558" height="796" alt="스크린샷 2025-07-11 203653" src="https://github.com/user-attachments/assets/1f422361-1582-4d5f-9b67-3fa151e1962e" />

아이콘 관련된 코드는 크게 4가지의 파일로 구성하였습니다.
IconData.ts는 모든 아이콘 정보(이름, 색상, SVG 경로, 카테고리)를 가진 데이터베이스, 
getPath.ts는 SVG에서 필요한 경로 정보만 추출하는 헬퍼 함수,
BaseIcon.tsx는모든 아이콘의 기본 모양을 정의하는 컴포넌트이고
iconRegistry.ts는아이콘 컴포넌트 생성하는 함수 입니다.

<img width="1560" height="798" alt="스크린샷 2025-07-11 203700" src="https://github.com/user-attachments/assets/ec3e534e-672d-4f96-9f15-c58c0f82330e" />

IconData는 사용할 모든 아이콘의 정보를 하나의 목록으로 정의하였습니다. 한마디로 아이콘 컴포넌트를 만들어내기 위한 재료입니다.
아이콘의 이름과 대표 색상 그리고 path와 분류할 category를 선언합니다.
그리고 getPath는 svg파일에서 경로만 추출하는 역할을 수행합니다.

<img width="1552" height="795" alt="스크린샷 2025-07-11 203708" src="https://github.com/user-attachments/assets/bb0b99de-babc-436f-ad8f-7fa4a5b5dcd3" />

그리고 BaseIcon.tsx 에선 아이콘들이 사용되는 기본 컴포넌트 즉, 틀을 구현하였습니다. 이것은 아이콘 컴포넌트의 모양을 잡아주는 역할을 수행합니다.

<img width="1557" height="797" alt="스크린샷 2025-07-11 203724" src="https://github.com/user-attachments/assets/42fcad2f-c360-4d6b-9904-8f768a733c07" />

다음의 IconRegistry.ts는 앞선 재료와 틀을 기반으로 아이콘을 만들어 냅니다
createIconComponent 커스텀 함수는, 리엑트 내장 API인 createElement를 활용하여 사용자 설정에 맞는 svg 아이콘 컴포넌트를 생성하는 함수고 이 함수는 아래의 Icons에서 직접 생성됩니다.
이 Icons 객체는 reduce 메서드를 이용하여 기존 정의해두었던 IconData를 순회하며 카테고리에 알맞는 함수형 컴포넌트를 담아 둡니다.
그리고 최종적으로  Icons를 다음과 같이 구조 분해하여 사용하게됩니다. 
따라 사용하는 곳에선,  Icons에 저장되어있는 함수를 호출하여 React 엘리먼트 즉, 아이콘 컴포넌트를 생성해냅니다.
이렇게 컴포넌트를 동적으로 생성하는 것과 개별 SVG파일로 저장했을 경우를 비교하면, 개별 저장시에 생길 많은 개별 모듈을 하나의 모듈로 관리할 수 있게 됩니다. 
또한 앞서 말한 듯이 개발자의 경험개선으로서 아이콘 추가 시 새 파일 생성, 임포트 추가, 컴포넌트 정의 등 여러 단계들이 ICON_LIST에 새 항목 추가만으로 아이콘 확장이 가능해집니다.
