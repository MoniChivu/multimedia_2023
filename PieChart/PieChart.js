function getMaxFromValues(values){
    max=values[0];
    for(i=0;i<values.length;i++){
        if(max<values[i])
        max=values[i];
    }
    return max;
}

function makeChart(cx,cy,rad,values){
    // create the title
    // font of the title
    ctx.font="40px serif"

    gradient=ctx.createRadialGradient(75,50,5,50,60,100);
    gradient.addColorStop(0,"pink");
    gradient.addColorStop(0.5,"red");
    gradient.addColorStop(1,"pink");

    ctx.fillStyle=gradient;

    // fillText(text, x - The x-axis coordinate of the point at which to begin drawing the text, y)
    ctx.fillText("Pie Chart",cx-100,45);

    sum=0;
    for(i=0;i<values.length;i++){
        sum+=values[i];
    }
    startAngle=0;
    endAngle=0;

    for(i=0;i<values.length;i++){
        ctx.beginPath();
        startAngle=endAngle;
        red=Math.random()*255;
        blue=Math.random()*255;
        green=Math.random()*255;

        colors[i]="rgb("+red+","+green+","+blue+")";

        pieSlice=values[i]/sum;
        endAngle=startAngle+pieSlice*2*Math.PI;
        // arc(x, y, radius, startAngle, endAngle)
        // x- The horizontal coordinate of the arc's center.
        // y-The vertical coordinate of the arc's center.
        ctx.arc(cx,cy,rad,startAngle,endAngle)
        ctx.lineTo(cx,cy);
        ctx.fillStyle=colors[i];
        ctx.fill();
        ctx.closePath();
    }
}

function loadPage(){
    values=[10,20,30,40,50,60];
    colors=new Array();
    ul=document.getElementById('myul');
    max=getMaxFromValues(values);
    
    for(i=0;i<values.length;i++){
        // create the list element, label and input
        li=document.createElement('li');
        label=document.createElement('label');
        input=document.createElement('input');

        // label for attribute with id, the value "Value id+1"
        label.setAttribute('for','id'+i);
        label.textContent='Value'+(i+1);

        // we set the id for the input
        input.setAttribute('id','id'+i);
        // we set the type of the input
        input.setAttribute('type','range');
        // we set the maximum value
        input.setAttribute('max',max);
        // we attribute the value of our array
        input.value=values[i]

        li.appendChild(label);
        li.appendChild(input);
        ul.appendChild(li);
    }

    // drawing the pie chart
    // The Document.getElementById() method gets a reference to the HTML <canvas> element. 
    canva=document.getElementById("myCanva");
    // Next, the HTMLCanvasElement.getContext() method gets that element's context—the thing onto which the drawing will be rendered.
    ctx=canva.getContext('2d')

    cx=canva.width/2;
    cy=canva.height/2;
    const margin=30;
    rad=cx<cy ? cx-margin:cy-margin;
    makeChart(cx,cy,rad,values)
}