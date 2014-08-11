/** Created by fengjie on 14-8-4.*/
'use strict';



/**根据key判断localStorage是否为空*/
        function isKeyNULL(key)
        {
            return localStorage.getItem(key)==null;
        }

/**根据key取出localStorage内容，并转化为对象格式*
 *
 * @param key
 * @returns {Array}或者[]
 */
        function getLocal(key)
        {
            var oneLocalStorage=isKeyNULL(key) ? []:JSON.parse(localStorage.getItem(key));
            return oneLocalStorage;
        }

/**根据key，value存入localStorage，存入数组对象*
 *
 * @param key
 * @param value
 */
        function setLocal(key,value)
        {
            var  arr;
            arr=isKeyNULL(key) ? [] : JSON.parse(localStorage.getItem(key));
            arr.push(value);
            localStorage.setItem(key,JSON.stringify(arr));
        }





/******************只有活动状态和竞价状态会直接存储状态字符串************************************/
/**根据key，取出字符串*/
        function getLocalString(key)
        {
            var oneLocalStorage;
            oneLocalStorage=isKeyNULL(key) ? "" : localStorage.getItem(key);
            return oneLocalStorage;
        }
/**根据key，存入字符串*/
        function setLocalString(key,value)
        {
              localStorage.removeItem(key);
              localStorage.setItem(key,JSON.stringify(value));
        }


/**根据key，删除某个localstorage*/

        function removeLocal(key)
        {
            localStorage.removeItem(key);
        }