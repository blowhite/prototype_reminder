EXPO 프로젝트 자체가 처음인 경우
npm install --global expo-cli eas-cli

npx expo startß

// eas.json
{
  "cli": {
    "version": ">= 2.7.1"
  },ßa
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {}
  },
  "submit": {
    "production": {}
  }
}

/.vscode/launch.json

{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Debug in Exponent",
            "cwd": "${workspaceFolder}",
            "type": "reactnative",
            "request": "launch",
            "platform": "exponent"
        }
    ]
}

실행
npx expo start

빌드
0. (처음하는 경우) eas build:configure

1. eas build --platform android
2. 완료된 경우 진행중이던 터미널에서 Android app 주소를 표시하는데 링크 타고 들어가서 프로그램을 다운받는다
3. (이하 aab 파일 받은 경우) aab 파일의 경우 직접적으로 설치 할 수 없고 변환 후 설치해야 한다.
4. aab 파일과 같은 경로에 bundletool.jar 파일을 배치.(예시로 bundletool-all-1.13.1.jar 파일 사용)
5. 터미널에서 aab와 bundletool.jar 파일이 있는 곳으로 cd 이동
6. 터미널 내 커맨드 입력
java -jar "bundletool-all-1.13.1.jar" build-apks --bundle="aab파일명.aab" --output="생성파일명.apks" --mode=universal
7. 이후 같은 경로에 "생성파일명.apks"가 생성되는데 확장자를 zip로 변경하고 열여보면 universal.apk 파일 있음.
8. 해당 파일을 디바이스에 옮기고 설치.
