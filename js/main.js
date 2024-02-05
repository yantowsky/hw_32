const programCom = {
    first: {
        num: "I",
        title: "Не поламай",
        text: "Якщо тобі щось не подобається, то не спіши це виправляти, якщо не знаєш, для чого це було зроблено."
    },
    second: {
        num: "II",
        title: "Не cкопіпасть",
        text: "Копіпаста - зло. Не розмножуй код. Чим менше коду - тим менше багів."
    },
    third: {
        num: "III",
        title: "Не захардкодь",
        text: "Особливо якщо грішиш копіпастою."
    },
    fourth: {
        num: "IV",
        title: "Не перестарайся",
        text: "Зберігай прості речі простими. Не ходи танками на горобців."
    },
    fifth: {
        num: "V",
        title: "Не мудруй лукаво",
        text: "Не пиши хитростей, які неможливо зрозуміти."
    },
    sixth: {
        num: "VI",
        title: "Пам'ятай про ближніх",
        text: "Думай про тих, хто буде читати твій код. Можливо це будеш ти сам."
    },
    seventh: {
        num: "VII",
        title: "Називай речі своїми іменами",
        text: "Нехай назва функції відображає те, що вона робить, а назва поля - те, що воно збегірає. Дотримуйся правил іменування."
    },
    eighth: {
        num: "VII",
        title: " Відділяй мухи до мух, а котлети до котлет",
        text: "Дотримуйся архітектури. Розкладай все по своїх місцях."
    },
    ninth: {
        num: "IX",
        title: "Шукай і знайдеш, питай і тобі дадуть відповідь",
        text: "Якщо на твоє питання ніхто не знає відповіді, можливо, час почитати документацію."
    },
    tenth: {
        num: "X",
        title: "Проникай в суть",
        text: "Не пиши милиць і затичок. Виправляй причину, а не наслідок, і буде тобі щастя."
    }
}

let arrNewTabsItem = [];
let arrTextTabsBody = [];

for (key in programCom) {
    arrNewTabsItem.push(`
        <li class="tabs__item">
            <h3 class="tabs__text">
                ${programCom[key].num}. ${programCom[key].title}
            </h3>
        </li>
        `);
    arrTextTabsBody.push(programCom[key].text);
}

let title = document.querySelector(".title");
console.log(title);
let copyright = document.querySelector(".copyright");
console.log(copyright);
let tabsItem = document.querySelectorAll(".tabs__item");
console.log(tabsItem);
let tabsList = document.querySelector(".tabs__list");
console.log(tabsList);
let tabsSection = document.querySelector(".tabs__section");
console.log(tabsSection);

function getTabsBodyAnimText(index) {
    let h2 = document.createElement("h2");
    h2.classList.add("tabs__body");
    h2.innerText = `${arrTextTabsBody[index]}`;
    tabsSection.replaceChildren(h2);
    let tabsBody = document.querySelector(".tabs__body");
    let cursor = document.createElement("span");
    cursor.classList.add("cursor");
    cursor.textContent = "|";
    let inText = arrTextTabsBody[index];
    let outText = "";
    let animationText = (i) => {
        setTimeout(() => {
            outText += inText[i];
            tabsBody.textContent = outText;
            tabsBody.append(cursor);
        }, 120 * i);
    }
    for (let i = 0; i < inText.length; i++) {
        animationText(i);
    }
}

let arrLastClickIndex = [];
let actualClickIndex;

tabsItem.forEach((element, index) => {
    console.log(element);
    tabsItem[index].addEventListener("click", function () {
        title.innerText = "Десять заповідей програміста";
        copyright.innerText = "© 2024";
        actualClickIndex = index;
        tabsList.innerHTML = arrNewTabsItem.join("");
        getTabsBodyAnimText(index);
        let newTabsItem = document.querySelectorAll(".tabs__item");
        console.log(newTabsItem);
        let newTabsText = document.querySelectorAll(".tabs__text");
        console.log(newTabsText);
        newTabsItem[index].style.borderRight = "none";
        newTabsItem[index].style.backgroundColor = "#d9d2e9";

        newTabsItem.forEach((element, index) => {
            console.log(element);
            newTabsItem[index].addEventListener("mouseover", function () {
                newTabsText[index].style.transform = `translateX(calc(${newTabsItem[index].clientWidth}px - 100% - 20px))`;
                newTabsText[index].style.transition = "3s all";
                newTabsItem[index].style.backgroundColor = "#d9d2e9";
            });
            newTabsItem[index].addEventListener("mouseout", function () {
                newTabsText[index].style.transform = `translateX(0)`;
                newTabsText[index].style.transition = "5s all";
                newTabsItem[index].style.backgroundColor = "#cfe2f3";
                newTabsItem[actualClickIndex].style.backgroundColor = "#d9d2e9";
            });
            newTabsItem[index].addEventListener("click", function () {
                getTabsBodyAnimText(index);
                newTabsItem[actualClickIndex].style.backgroundColor = "#cfe2f3";
                newTabsItem[actualClickIndex].style.borderRight = "1px solid #000";
                actualClickIndex = index;
                arrLastClickIndex.push(index);
                if (arrLastClickIndex.length === 3) {
                    arrLastClickIndex.shift();
                }
                (index === arrLastClickIndex[0]) ?
                    (newTabsItem[index].style.borderRight = "none",
                        newTabsItem[index].style.backgroundColor = "#d9d2e9") :
                    (newTabsItem[index].style.borderRight = "none",
                        newTabsItem[index].style.backgroundColor = "#d9d2e9",
                        newTabsItem[arrLastClickIndex[0]].style.backgroundColor = "#cfe2f3",
                        newTabsItem[arrLastClickIndex[0]].style.borderRight = "1px solid #000")
            });
        });
    });
});