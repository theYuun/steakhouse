
// Getting Story Data from data.json

const data = import('./data.json', { assert: { type: 'json' }});
data.then((d) => FillMenu(d.default));// console.log(d.default.menu[0].categories[0].categoryId));
//data.then((d) => FillStory(d.default.story[0]));

let main = document.querySelector('main');
function FillMenu(d)
{
    let data = d.footer;

    for(let footerLink = 0; footerLink < data.length; footerLink++)
    {
        let footerSection = document.createElement('section');
        let sectionName = data[footerLink].footerName;
        footerSection.setAttribute('id', 'content-' + sectionName);
        footerSection.className = 'content';
        footerSection.classList.add('content-' + data[footerLink].footerName);
        
        let footerSecH = document.createElement('h2');
        let sectionHeading = data[footerLink].footerHeading.toUpperCase();
        footerSecH.innerText = sectionHeading;
        footerSection.appendChild(footerSecH);
        
        let footerSecHHr = document.createElement('hr');
        footerSection.appendChild(footerSecHHr);
        main.appendChild(footerSection);

        for(let footerFieldset = 0; footerFieldset < data[footerLink].footerFieldsets.length; footerFieldset++) {

            let fieldset = document.createElement('fieldset');
            footerSection.appendChild(fieldset);

            let fieldsetLegend = document.createElement('legend');
            let fieldsetLegendH = document.createElement('h3');
            let fieldsetLegendHeading = data[footerLink].footerFieldsets[footerFieldset].fieldsetLegend;
            fieldsetLegendH.innerText = fieldsetLegendHeading.charAt(0).toUpperCase() + fieldsetLegendHeading.slice(1);
            fieldsetLegend.appendChild(fieldsetLegendH);
            fieldset.appendChild(fieldsetLegend);
            
            if(data[footerLink].footerFieldsets[footerFieldset].fieldsetHasImage)
            {
                let fieldsetImageContainer = document.createElement('div');
                fieldset.appendChild(fieldsetImageContainer);
                
                let fieldsetImage = document.createElement('img');
                fieldsetImage.setAttribute('src', 'images/' + sectionName.toLowerCase() + '-' + (footerFieldset + 1).toString() + '.jpg');
                fieldsetImage.className = 'image-' + sectionName.toLowerCase();
                fieldsetImage.classList.add('image-' + sectionName.toLowerCase() + '-' + (footerFieldset + 1).toString());
                fieldsetImageContainer.appendChild(fieldsetImage);
            }
            
            for(let fieldsetDetail = 0; fieldsetDetail < data[footerLink].footerFieldsets[footerFieldset].fieldsetDetails.length; fieldsetDetail++)
            {
                let fieldsetText = document.createElement('p');
                fieldsetText.innerText = data[footerLink].footerFieldsets[footerFieldset].fieldsetDetails[fieldsetDetail].toString();
                fieldset.appendChild(fieldsetText);

            }

            footerSection.appendChild(fieldset);
        }
    }

    data = d.menu;
    for(let menuCategory = 0; menuCategory < data.length; menuCategory++)
    {
        let category = data[menuCategory].categoryName;
        let categoryTimes = [data[menuCategory].slotTimeStart, data[menuCategory].slotTimeEnd];
        let section = document.createElement('section');
        section.setAttribute('id', 'menu-' + data[menuCategory].categoryName.toLowerCase());
        section.className = 'menu';
        section.classList.add('menu-' + data[menuCategory].categoryName.toLowerCase());
        section.classList.add('menu-' + data[menuCategory].categoryClassAlternative.toLowerCase());
        let sectionH = document.createElement('h2');
        sectionH.innerText = category.charAt(0).toUpperCase() + category.slice(1);
        let sectionHHr = document.createElement('hr');
        let sectionUl = document.createElement('ul')
        section.appendChild(sectionH);
        section.appendChild(sectionHHr);
        section.appendChild(sectionUl);

        let slotOptions = data[menuCategory].slotOptions;
        for(let slotOption = 0; slotOption < slotOptions.length; slotOption++)
        {
            let sectionUlLi = document.createElement('li');
            let sectionUlLiDl = document.createElement('dl');
            let sectionUlLiDlDt = document.createElement('dt');
            let slotTitle = document.createElement('h3');
            slotTitle.innerText = slotOptions[slotOption].optName;
            sectionUlLiDlDt.appendChild(slotTitle);

            let slotDescription = document.createElement('dd');
            slotDescription.innerText = slotOptions[slotOption].optDescription;

            let slotImageContainer = document.createElement('dd');
            let slotImage = document.createElement('img');
            //console.log('images/' + category + '-' + slotOptions[slotOption].optId + '.jpg');
            slotImage.src = 'images/' + category + '-' + slotOptions[slotOption].optId + '.jpg';
            slotImage.className = 'image-menu-item';
            slotImageContainer.appendChild(slotImage);
            
            let slotImageShadowLeft = document.createElement('div');
            slotImageShadowLeft.className = 'image-menu-item-before';
            slotImage.appendChild(slotImageShadowLeft);
            let slotImageShadowRight = document.createElement('div');
            slotImageShadowRight.className = 'image-menu-item-after';
            slotImage.appendChild(slotImageShadowRight);

            let slotIngredients = document.createElement('dd');
            let slotIngredientTitle = document.createElement('h4');
            slotIngredientTitle.innerText = 'Ingredients:';
            slotIngredientTitle.innerHTML += '<br>';
            let ingredients = slotOptions[slotOption].optIngredients;
            let doCapitalize = true;
            for (let ingredient = 0; ingredient < ingredients.length; ingredient++)
            {
                //console.log(ingredients[ingredient]);
                let ingr = ingredients[ingredient];
                if(doCapitalize)
                {
                    ingr = ingredients[ingredient].substring(0,1).toUpperCase() + ingredients[ingredient].substring(1, ingredients[ingredient].length);
                    doCapitalize = false;
                }
                slotIngredients.innerText += ingr;
                if(ingredient < ingredients.length - 1)
                slotIngredients.innerText += ", ";
                else
                slotIngredients.innerText += ".";
                
            }
            let pricingDd = document.createElement('dd');
            let pricingUl = document.createElement('ul');
            pricingDd.appendChild(pricingUl);
            let pricingLi = document.createElement('li');
            pricingUl.appendChild(pricingLi);
            pricingLi.innerText = '$ ' + (slotOptions[slotOption].optPriceCents / 100).toString();
            let alternatives = slotOptions[slotOption].optPriceAlternatives;
            for(let alt = 0; alt < alternatives; alt++)
            {
                let pricingAltLi = document.createElement('li');
                pricingAltLi.innerText = alternatives[alt].name + ': ' + alternatives[alt].operation + ' $ ' + (alternatives[alt].price / 100).toString();;
                pricingUl.appendChild(pricingAltLi);
                    /*

                    Add code here to load in the alternatives
                    Remember to add br's as well!

                    */
            }
            
            sectionUlLiDl.appendChild(sectionUlLiDlDt);
            sectionUlLiDl.appendChild(slotDescription);
            sectionUlLiDl.appendChild(slotImageContainer);
            sectionUlLiDl.appendChild(slotIngredients);
            sectionUlLiDl.appendChild(pricingDd);
            sectionUlLi.appendChild(sectionUlLiDl);
            sectionUl.appendChild(sectionUlLi);
        }

        main.appendChild(section);
    }
    HideMenus();
    ShowStory();
}


function HideMenus() {
    document.querySelectorAll('.menu, .content').forEach(x => {
        x.classList.add('hidden');
    });
}

function ShowStory() {
    document.querySelector('.content-story').classList.remove('hidden');
}

document.querySelectorAll('.button-nav').forEach(x => {
    x.addEventListener('click', () => {
        HideMenus();
        document.querySelector('.menu-' + x.innerText.toLowerCase()).classList.remove('hidden');
    });
});

document.querySelectorAll('.button-content').forEach(x => {
    x.addEventListener('click', () => {
        HideMenus();
        document.querySelector('.content-' + x.innerText.toLowerCase()).classList.remove('hidden');
    });
});
