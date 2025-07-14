export const useTag = (option) => {

  let { tags } = option || {}

  const addTag = (e) => {
    const tagValue = e.target.value.replace(/ /g, '');
    if (!tagValue) {
      return;
    }

    console.log("tags.length: ", tags.value.length)
    if (tags.value.length >= 10) {
      Notify.create({
        message: "태그는 10개 이상 등록할 수 없습니다.",
        type: 'warning'
      })
      return;
    }
    if (tags.value.includes(tagValue) === false) {
      tags = [...tags.value, tagValue]
    }
    e.target.value = '';
    console.log('tags: ', tags)
  }
  
  const removeTag = (index) => {
    const model = [...tags.value];
    model.splice(index, 1);
    tags = model;
  }

  return {
    addTag,
    removeTag
  }
}