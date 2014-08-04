/**
 * Created by fengjie on 14-8-4.
 */

/*定义全局函数专门用于数据处理*/


/**根据key判断localStorage是否为空
 * null:true
 * notnull:false
 */
        function isKeyNULL(key)
        {
            return localStorage.getItem(key)==null;
        }
/**根据key取出localStorage内容,得到字符串
 * null:""
 * notnull:实际的字符串
 * **/
        function getLocalString(key)
        {
            var oneLocalStorage;
            if(isKeyNULL(key))
            {
                oneLocalStorage="";
            }
            else
            {
                oneLocalStorage=localStorage.getItem(key);
            }
            return oneLocalStorage;
        }
/**根据key取出localStorage内容，并转化为对象格式
 * null：[]
 * notnull:对象数组
 * */
        function getLocalObiect(key)
        {
            var oneLocalStorage;
            if(isKeyNULL(key))
            {
                oneLocalStorage=[];
            }
            else
            {
                oneLocalStorage=JSON.parse(localStorage.getItem(key));
            }
            return oneLocalStorage;
        }
/**根据key，value存入localStorage，存入字符串
 * 先清空再存储
 * */
function setLocalString(key,value)
{
    localStorage.removeItem(key);
    localStorage.setItem(key,JSON.stringify(value));
}

/**根据key，value存入localStorage，存入数组对象
 * 利用数组对象的push方法
 * */
function setLocalObject(key,value)
{
    var  oneLocalStorage;
    oneLocalStorage=JSON.parse(localStorage.getItem(key) || '[]');
    oneLocalStorage.push(value);
    localStorage.setItem(key,JSON.stringify(value));
}

