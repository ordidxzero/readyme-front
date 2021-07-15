import { reviewApi } from "./client";
import getMovieId from "./utils";

const reviewCount = document.querySelector(
  "span.main__column__action__review-container__count"
);

const reviewList = document.querySelector(
  "ul.main__column__action__review-container__list"
);

const reviewInput = document.querySelector(
  "input.main__column__action__review-container__form__input"
);

const reviewSubmitBtn = document.querySelector(
  "button.main__column__action__review-container__form__submit"
);

const client = reviewApi(getMovieId());

function generateReview(data) {
  const {
    created_at,
    review_id,
    text,
    user: { name, profile_url, user_id },
  } = data;
  const user = JSON.parse(localStorage.getItem("readyme"));
  const li = document.createElement("li");
  const profileImg = document.createElement("img");
  const nameSpan = document.createElement("span");
  const createdAt = document.createElement("span");
  const textSpan = document.createElement("span");
  const column = document.createElement("div");
  const row = document.createElement("div");
  const nameColumn = document.createElement("div");
  li.classList.add("review-container__list__item");
  li.setAttribute("data-reviewid", review_id);
  profileImg.classList.add("review-container__list__item__img");
  nameSpan.classList.add("review-container__list__item__name");
  createdAt.classList.add("review-container__list__item__created-at");
  textSpan.classList.add("review-container__list__item__text");
  column.classList.add("review-container__list__item__column");
  row.classList.add("review-container__list__item__column__row");
  profileImg.src = profile_url;
  nameSpan.innerText = name;
  createdAt.innerText = created_at.split(".")[0];
  textSpan.innerText = text;
  nameColumn.appendChild(nameSpan);
  nameColumn.appendChild(createdAt);
  row.appendChild(nameColumn);
  if (user && user.user_id === user_id) {
    const btnColumn = document.createElement("div");
    const editButton = document.createElement("span");
    const removeButton = document.createElement("span");
    editButton.classList.add("review-container__list__item__btn", "edit");
    removeButton.classList.add("review-container__list__item__btn", "remove");
    editButton.innerText = "수정";
    removeButton.innerText = "삭제";
    editButton.setAttribute("data-userid", user_id);
    removeButton.addEventListener("click", () => {
      client.deleteReview(review_id).then(() => {
        const review = document.querySelectorAll(
          `[data-reviewid='${review_id}']`
        )[0];
        reviewList.removeChild(review);
        reviewCount.innerText = `리뷰 ${
          +reviewCount.innerText.split(" ")[1].slice(0, -1) - 1
        }개`;
      });
    });
    btnColumn.appendChild(editButton);
    btnColumn.appendChild(removeButton);
    row.appendChild(btnColumn);
  }
  column.appendChild(row);
  column.appendChild(textSpan);
  li.appendChild(profileImg);
  li.appendChild(column);
  return li;
}

if ([1, 2, 3].includes(getMovieId())) {
  client.getReview().then(res => {
    const { data, total_elements } = res.data;
    reviewCount.innerText = `리뷰 ${total_elements}개`;
    data.forEach(review => {
      const li = generateReview(review);
      reviewList.appendChild(li);
      return;
    });
  });
}

if (reviewSubmitBtn) {
  reviewSubmitBtn.addEventListener("click", function () {
    if (reviewInput.value !== "") {
      return client.postReview(reviewInput.value).then(res => {
        reviewInput.value = "";
        reviewCount.innerText = `리뷰 ${
          +reviewCount.innerText.split(" ")[1].slice(0, -1) + 1
        }개`;
        const { data } = res.data;
        const li = generateReview(data);
        reviewList.appendChild(li);
        return;
      });
    }
  });
}
