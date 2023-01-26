ymaps.ready(init)

function init()
{
  const myMap = new ymaps.Map('map', {
    center: [55.68, 37.57],
    zoom: 12
  })

  const myPlacemark = new ymaps.Placemark([55.7, 37.6], {}, {
    iconLayout: 'default#image',
    iconImageHref: '../svg/ellipse.svg',
    iconImageSize: [15, 15],
    iconImageOffset: [-3, -3]
  })

  myMap.geoObjects.add(myPlacemark)
}

// import JustValidate  from 'just-validate'

// const validation = new JustValidate('#form')

/* validation
  .addField('#name', [
    {
      rule: 'minLength',
      value: 5
    },
    {
      rule: 'maxLength',
      value: 30
    }
  ])
  .addField('#email', [
    {
      rule: 'required',
      errorMessage: 'Email is required'
    },
    {
      rule: 'email',
      errorMessage: 'Email is invalid!'
    }
  ]) */
