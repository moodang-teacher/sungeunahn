document.addEventListener("DOMContentLoaded", () => {
  const butterfly = document.querySelector(".butterfly");

  // 목표 도착 위치 (화면 왼쪽 상단의 5% 지점)
  const TARGET_X = window.innerWidth * 0.05;
  const TARGET_Y = window.innerHeight * 0.05;

  // 1. 나비가 원형 궤도를 따라 날아 들어오는(Fly In) 애니메이션
  function flyInAnimation() {
    const duration = 7000; // 7초 동안 애니메이션 진행
    const startTime = performance.now();

    // 원 운동 설정
    const circleRadius = 230; // 원의 반지름 (px)
    const rotations = 2; // 총 회전 횟수 (두 바퀴)

    // 🌟 수정된 부분: 시작 위치 설정 (화면 왼쪽 밖에서 시작)
    const startCenterX = -window.innerWidth * 0.5; // 화면 왼쪽 밖 (중앙 대신 왼쪽 50% 밖)
    const startCenterY = window.innerHeight * 0.5; // 화면 세로 중앙

    // 최종 도착 위치 설정 (궤적 끝)
    // 나비가 최종적으로 TARGET_X, TARGET_Y에 닿으려면 원의 중심이 이 위치로 이동해야 합니다.
    const endCenterX = TARGET_X + circleRadius;
    const endCenterY = TARGET_Y;

    // 시작 크기: 0.2배, 최종 크기: 1.0배
    const startScale = 0.2;
    const endScale = 1.0;

    function animateFlyIn(currentTime) {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1); // 0에서 1 사이의 진행률

      // 'ease-in-out'과 유사한 부드러운 진행률
      const easedProgress = 0.5 - Math.cos(progress * Math.PI) / 2;

      // 1. 원의 중심 위치를 시작점에서 최종 도착점까지 보간 (interpolate)
      const currentCenterX =
        startCenterX + (endCenterX - startCenterX) * easedProgress;
      const currentCenterY =
        startCenterY + (endCenterY - startCenterY) * easedProgress;

      // 2. 현재 각도 계산 (두 바퀴 회전)
      const angle = progress * rotations * 360 * (Math.PI / 180);

      // 3. 원 궤적을 이용한 나비의 위치 계산 (좌표는 원의 중심을 기준으로 계산됨)
      const currentX = currentCenterX + circleRadius * Math.cos(angle);
      const currentY = currentCenterY + circleRadius * Math.sin(angle);

      // 4. 크기(Scale) 계산
      const currentScale = startScale + (endScale - startScale) * easedProgress;

      // 5. 나비가 나타나도록 opacity 설정
      butterfly.style.opacity = easedProgress;

      // 6. CSS transform 적용
      butterfly.style.transform = `translate(${currentX}px, ${currentY}px) scale(${currentScale})`;

      if (progress < 1) {
        requestAnimationFrame(animateFlyIn);
      } else {
        // 원 운동이 끝나면 미세 움직임 시작 (최종 도착 지점 전달)
        // 원 운동의 최종 도착점은 TARGET_X, TARGET_Y 입니다.
        flutterAnimation(TARGET_X, TARGET_Y);
      }
    }

    // 애니메이션 시작
    requestAnimationFrame(animateFlyIn);
  }

  // 2. 나비가 도착 후 팔랑거리며(Flutter) 미세하게 움직이는 애니메이션 (변경 없음)
  function flutterAnimation(baseX, baseY) {
    // ... (이전 코드와 동일하게 유지)
    const flutterStrength = 10;
    const flutterDuration = 2000;

    let startTime = performance.now();

    function animateFlutter(currentTime) {
      const elapsedTime = currentTime - startTime;
      const sinValue = Math.sin((elapsedTime / flutterDuration) * 2 * Math.PI);

      const offsetX = sinValue * flutterStrength * 0.5;
      const offsetY = sinValue * flutterStrength;

      const scale = 1 + sinValue * 0.01;

      butterfly.style.transform = `translate(${baseX + offsetX}px, ${
        baseY + offsetY
      }px) scale(${scale})`;

      requestAnimationFrame(animateFlutter);
    }

    requestAnimationFrame(animateFlutter);
  }

  // 전체 나비 애니메이션 시작
  flyInAnimation();
});
