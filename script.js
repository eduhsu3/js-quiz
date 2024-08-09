let quizData = [
    {
        question: '수정3 퀴즈1제목입니다.',
        example: [{ a: '퀴즈1 보기1입니다.' }, { b: '퀴즈1 보기2입니다.' }, { c: '퀴즈1 보기3입니다.' }, { d: '퀴즈1 보기4입니다.' }],
        answer: 'a',
    },
    {
        question: '수정3 퀴즈2제목입니다.',
        example: [{ a: '퀴즈2 보기1입니다.' }, { b: '퀴즈2 보기2입니다.' }, { c: '퀴즈2 보기3입니다.' }, { d: '퀴즈2 보기4입니다.' }, { e: '퀴즈2 보기5입니다.' }, { f: '퀴즈2 보기6입니다.' }, { g: '퀴즈2 보기7입니다.' }],
        answer: 'g',
    },
    {
        question: '퀴즈3제목입니다.',
        example: [{ a: '퀴즈3 보기1입니다.' }, { b: '퀴즈3 보기2입니다.' }, { c: '퀴즈3 보기3입니다.' }, { d: '퀴즈3 보기4입니다.' }],
        answer: 'c',
    },
    {
        question: '퀴즈4제목입니다.',
        example: [{ a: '퀴즈4 보기1입니다.' }, { b: '퀴즈4 보기2입니다.' }, { c: '퀴즈4 보기3입니다.' }, { d: '퀴즈4 보기4입니다.' }],
        answer: 'd',
    },
];

let quizTotalNum = quizData.length;
let currQuizNum = 0;
let successCount = 0;

//화면에 그리기
let eleQuiz = document.querySelector('#quiz');
let eleQuestion = document.querySelector('#question');
let eleExampleUl = document.querySelector('#examList');
function renderQuiz(prmQuizNum) {
    eleExampleUl.innerHTML = '';
    eleQuestion.textContent = quizData[prmQuizNum].question;
    let exampleArray = quizData[prmQuizNum].example;
    exampleArray.forEach((item) => {
        const li = document.createElement('li');
        const label = document.createElement('label');
        const input = document.createElement('input');

        input.type = 'radio';
        input.name = 'answer';
        input.class = 'answer';
        for (let key in item) {
            label.htmlFor = key;
            input.id = key;
            input.value = key;
            label.textContent = item[key];
        }
        li.appendChild(input);
        li.appendChild(label);
        eleExampleUl.appendChild(li);
    });
}

//정답 비교함수
function compareAnswer() {
    const eleRadios = document.querySelectorAll('input[name="answer"]');
    let userChoice = null;
    eleRadios.forEach((item) => {
        if (item.checked) {
            userChoice = item.id;
        }
    });
    const originAnswer = quizData[currQuizNum].answer;
    if (userChoice === null) {
        alert('퀴즈 정답을 선택해주세요');
        return false;
    }
    if (userChoice === originAnswer) {
        successCount++;
    }
}

//submit 버튼
const submit = document.querySelector('#submit');
submit.addEventListener('click', () => {
    let compareResult = compareAnswer();
    if (compareResult === false) {
        return;
    }

    currQuizNum++;
    if (currQuizNum < quizTotalNum) {
        renderQuiz(currQuizNum);
    }
    if (currQuizNum >= quizTotalNum) {
        quizFinish();
    }
});

function quizFinish() {
    //alert(`퀴즈가 끝났어요 ${successCount}개 맞췄어요`);
    eleQuiz.innerHTML = `<h2>전체 ${quizTotalNum}중에 ${successCount}개 맞췄어요</h2>
    <button onclick="location.reload()">다시하기</button>`;

    // //전역변수초기화
    // currQuizNum = 0;
    // successCount = 0;
    // //다시시작
    // renderQuiz(currQuizNum);
}

//init
renderQuiz(currQuizNum);
