// Copyright 2011 David Galles, University of San Francisco. All rights reserved.
//
// Redistribution and use in source and binary forms, with or without modification, are
// permitted provided that the following conditions are met:
//
// 1. Redistributions of source code must retain the above copyright notice, this list of
// conditions and the following disclaimer.
//
// 2. Redistributions in binary form must reproduce the above copyright notice, this list
// of conditions and the following disclaimer in the documentation and/or other materials
// provided with the distribution.
//
// THIS SOFTWARE IS PROVIDED BY <COPYRIGHT HOLDER> ``AS IS'' AND ANY EXPRESS OR IMPLIED
// WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
// FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> OR
// CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
// CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
// SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
// ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
// NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
// ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
// The views and conclusions contained in the software and documentation are those of the
// authors and should not be interpreted as representing official policies, either expressed
// or implied, of the University of San Francisco

/// 放元素的起始坐标
var ARRAY_START_X = 100;
var ARRAY_START_Y = 200;
/// 一个小数组元素框的 宽度 和 高度
var ARRAY_ELEM_WIDTH = 50;
var ARRAY_ELEM_HEIGHT = 50;

/// 每行元素个数
var ARRRAY_ELEMS_PER_LINE = 15;
var ARRAY_LINE_SPACING = 130;

/// 画布开始坐标 （x,y）
var TOP_POS_X = 180;
var TOP_POS_Y = 100;

/// top操作的标签坐标
var TOP_LABEL_X = 130;
var TOP_LABEL_Y =  100;

/// 标签的坐标
var PUSH_LABEL_X = 50;
var PUSH_LABEL_Y = 30;

/// 放元素的坐标
var PUSH_ELEMENT_X = 120;
var PUSH_ELEMENT_Y = 30;

/// 表长
var SIZE = 30;

/// 类似java的super
function StackArray(am, w, h)
{
	this.init(am, w, h) ;
}

StackArray.prototype = new Algorithm();
StackArray.prototype.constructor = StackArray;
/// 伪继承父类
StackArray.superclass = Algorithm.prototype;


StackArray.prototype.init = function(am, w, h)
{
	StackArray.superclass.init.call(this, am, w, h);
	this.addControls();
	/// 内存区域位置
	this.nextIndex = 0;
	/// 控件命令
	this.commands = [];
	this.setup();
	this.initialIndex = this.nextIndex;
}

/// 控件controls 数组 那么广义地说也就是可以添加很多个控件 ：非常广义
/// 添加控件 : 就是 大标题下面那一排
StackArray.prototype.addControls =  function()
{
	/// 加控件数组
	this.controls = [];
	/// 增加文本框
	/// 鼠标按下后进行回调函数的使用
	this.pushField = addControlToAlgorithmBar("Text", "请输入数字");
	this.pushField.onkeydown = this.returnSubmit(this.pushField,  this.pushCallback.bind(this), 6);
	this.controls.push(this.pushField);


	this.pushButton = addControlToAlgorithmBar("Button", "放入一个元素");
	this.pushButton.onclick = this.pushCallback.bind(this);
	this.controls.push(this.pushButton);


	this.popButton = addControlToAlgorithmBar("Button", "弹出一个元素");
	this.popButton.onclick = this.popCallback.bind(this);
	this.controls.push(this.popButton);


	this.clearButton = addControlToAlgorithmBar("Button", "将栈清空");
	this.clearButton.onclick = this.clearCallback.bind(this);
	this.controls.push(this.clearButton);
	
}

/// 控制控件 可用 / 隐匿 
/// 使控件可用
StackArray.prototype.enableUI = function(event)
{
	/// disabled = false 可用
	for (var i = 0; i < this.controls.length; i++)
	{
		this.controls[i].disabled = false;
	}
}
/// 要在功能正在调用的时候控件必须消失
/// 使控件不可用
StackArray.prototype.disableUI = function(event)
{
	/// disabled = true 不可用
	for (var i = 0; i < this.controls.length; i++)
	{
		this.controls[i].disabled = true;
	}
}

/// 设置 array
StackArray.prototype.setup = function()
{
	this.nextIndex = 0;
	
	this.arrayID = new Array(SIZE);
	this.arrayLabelID = new Array(SIZE);
	for (var i = 0; i < SIZE; i++)
	{
		
		this.arrayID[i]= this.nextIndex++;
		this.arrayLabelID[i]= this.nextIndex++;
	}
	this.topID = this.nextIndex++;
	this.topLabelID = this.nextIndex++;
	
	this.arrayData = new Array(SIZE);
	this.top = 0;
	this.leftoverLabelID = this.nextIndex++;
	this.commands = new Array();
	
	for (var i = 0; i < SIZE; i++)
	{
		var xpos = (i  % ARRRAY_ELEMS_PER_LINE) * ARRAY_ELEM_WIDTH + ARRAY_START_X;
		var ypos = Math.floor(i / ARRRAY_ELEMS_PER_LINE) * ARRAY_LINE_SPACING +  ARRAY_START_Y;
		this.cmd("CreateRectangle", this.arrayID[i],"", ARRAY_ELEM_WIDTH, ARRAY_ELEM_HEIGHT,xpos, ypos);
		this.cmd("CreateLabel",this.arrayLabelID[i],  i,  xpos, ypos + ARRAY_ELEM_HEIGHT);
		this.cmd("SetForegroundColor", this.arrayLabelID[i], "#0000FF");
		
	}
	this.cmd("CreateLabel", this.topLabelID, "top", TOP_LABEL_X, TOP_LABEL_Y);
	this.cmd("CreateRectangle", this.topID, 0, ARRAY_ELEM_WIDTH, ARRAY_ELEM_HEIGHT, TOP_POS_X, TOP_POS_Y);
	
	this.cmd("CreateLabel", this.leftoverLabelID, "", PUSH_LABEL_X, PUSH_LABEL_Y);
	
	this.highlight1ID = this.nextIndex++;
	this.highlight2ID = this.nextIndex++;

	this.animationManager.StartNewAnimation(this.commands);
	this.animationManager.skipForward();
	this.animationManager.clearHistory();
	
}

		
/// 重置 array
StackArray.prototype.reset = function()
{
	this.top = 0;
	this.nextIndex = this.initialIndex;

}
		
/// 栈push操作的回调函数
StackArray.prototype.pushCallback = function(event)
{
	if (this.top < SIZE && this.pushField.value != "")
	{
		var pushVal = this.pushField.value;
		this.pushField.value = ""
		this.implementAction(this.push.bind(this), pushVal);
	}
}
		
/// 栈pop函数的回调函数
StackArray.prototype.popCallback = function(event)
{
	if (this.top > 0)
	{
		this.implementAction(this.pop.bind(this), "");
	}
}
		
/// 栈clear函数的回调函数
StackArray.prototype.clearCallback = function(event)
{
	this.implementAction(this.clearData.bind(this), "");
}


/// 清除所有数据
StackArray.prototype.clearData = function(ignored)
{
	this.commands = new Array();
	this.clearAll();
	/// windows 命令 commands
	return this.commands;			
}


/**
 * @function 栈的真正底层操作在这里 ！ 仔细阅读源码 ！ 这个部分是数组实现栈的最重要的操作 !
 */



/// 通过chrome的单步调试可知 这个不是一下显示出来的，而是相当于每一步给他添加一个cmd控制命令 然后最终将cmd回调 之后用js完全渲染至网页
/// 实现 栈的 push 操作
StackArray.prototype.push = function(elemToPush)
{
	/// 底层用数组模拟
	this.commands = new Array();

	/// 顶下标 ++
	var labPushID = this.nextIndex++;
	var labPushValID = this.nextIndex++;
	/// elemToPush 就是要放进去的元素：键盘输入的元素
	this.arrayData[this.top] = elemToPush;
	/// 放进data数组里

	///
	this.cmd("SetText", this.leftoverLabelID, "");


	this.cmd("CreateLabel", labPushID, " 我现在放进栈里面一个元素 : ", PUSH_LABEL_X, PUSH_LABEL_Y);
	this.cmd("CreateLabel", labPushValID,elemToPush, PUSH_ELEMENT_X, PUSH_ELEMENT_Y);
	
	this.cmd("Step");
	alert( " 开始构造元素 : " + elemToPush )
	this.cmd("CreateHighlightCircle", this.highlight1ID, "#0000FF",  TOP_POS_X, TOP_POS_Y);
	this.cmd("Step");

	/// 被放置元素的 x坐标位置 ， y坐标位置
	var xpos = (this.top  % ARRRAY_ELEMS_PER_LINE) * ARRAY_ELEM_WIDTH + ARRAY_START_X;
	var ypos = Math.floor(this.top / ARRRAY_ELEMS_PER_LINE) * ARRAY_LINE_SPACING +  ARRAY_START_Y;
	
	this.cmd("Move", this.highlight1ID, xpos, ypos + ARRAY_ELEM_HEIGHT);
	this.cmd("Step");
	
	this.cmd("Move", labPushValID, xpos, ypos);
	this.cmd("Step");
	
	this.cmd("Settext", this.arrayID[this.top], elemToPush);
	this.cmd("Delete", labPushValID);
	
	this.cmd("Delete", this.highlight1ID);
	
	this.cmd("SetHighlight", this.topID, 1);
	this.cmd("Step");

	/// 顶标+1
	this.top = this.top + 1;
	this.cmd("SetText", this.topID, this.top)
	this.cmd("Delete", labPushID);
	this.cmd("Step");
	/// 高亮一下
	this.cmd("SetHighlight", this.topID, 0);
	
	return this.commands;
}

StackArray.prototype.pop = function(ignored)
{
	this.commands = new Array();
	
	var labPopID = this.nextIndex++;
	var labPopValID = this.nextIndex++;
	
	this.cmd("SetText", this.leftoverLabelID, "");

	
	this.cmd("CreateLabel", labPopID, "被弹出去的值为 ", PUSH_LABEL_X, PUSH_LABEL_Y);
	
	
	this.cmd("SetHighlight", this.topID, 1);
	this.cmd("Step");

	this.top = this.top - 1;
	this.cmd("SetText", this.topID, this.top)
	this.cmd("Step");
	this.cmd("SetHighlight", this.topID, 0);
	
	this.cmd("CreateHighlightCircle", this.highlight1ID, "#0000FF",  TOP_POS_X, TOP_POS_Y);
	this.cmd("Step");
	
	var xpos = (this.top  % ARRRAY_ELEMS_PER_LINE) * ARRAY_ELEM_WIDTH + ARRAY_START_X;
	var ypos = Math.floor(this.top / ARRRAY_ELEMS_PER_LINE) * ARRAY_LINE_SPACING +  ARRAY_START_Y;
	
	this.cmd("Move", this.highlight1ID, xpos, ypos + ARRAY_ELEM_HEIGHT); 				
	this.cmd("Step");
	
	this.cmd("CreateLabel", labPopValID,this.arrayData[this.top], xpos, ypos);
	this.cmd("SetText", this.arrayID[this.top], "");
	this.cmd("Move", labPopValID,  PUSH_ELEMENT_X, PUSH_ELEMENT_Y);
	this.cmd("Step");
	this.cmd("Delete", labPopValID)
	this.cmd("Delete", labPopID);
	this.cmd("Delete", this.highlight1ID);
	this.cmd("SetText", this.leftoverLabelID, "被弹出去的值为: " + this.arrayData[this.top]);

	return this.commands;
}



StackArray.prototype.clearAll = function()
{
	this.commands = new Array();
	for (var i = 0; i < this.top; i++)
	{
		this.cmd("SetText", this.arrayID[i], "");
	}
	this.top = 0;
	this.cmd("SetText", this.topID, "0");
	return this.commands;
			
}
	

/// 当前的算法操作对象
var currentAlg;

/// 全局调用 init 初始化画布和所有的函数
/// init 函数什么都没做 就是做一个初始化 他就是个傀儡 ：来调用其他的函数 简而言之：为了方便
/// 这个人用了一种更强大的伪类思想来作为没有关系的类之间的联系
function init()
{
	/// 全局初始化函数：类继承思想：
	var animManag = initCanvas();
	/// 当前的算法是这个 ：初始这个画布
	currentAlg = new StackArray(animManag, canvas.width, canvas.height);
}
