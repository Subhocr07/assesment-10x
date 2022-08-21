let fs = require("fs");
let data = fs.readFileSync(0, 'utf-8');
let idx = 0;
data = data.split('\n');

function readLine() {
    idx++;
    return data[idx - 1].trim();
}

// -------- Do NOT edit anything above this line ----------
// Use readLine() for taking input, it will read one line of from the input  and is stored in string format




const doubleAgents=(string_arr)=>{
    for(i=0;i<string_arr.length;i++){
        if(string_arr[i].length<2){
            return string_arr[i]
        } 
        const arr=[];
        for(let i=0;i<string_arr[i].length;i++){
            let char=string_arr[i][i];
            if(string_arr[i].indexOf(char)!=i)
            continue;
            let remainder=string_arr[i].slice(0,i)+string_arr[i].slice(i+1,string_arr[i].length);
            for(let agents of doubleAgents(remainder)){
                arr.push(char+agents)
            }
        }
        return arr;
    }
}

let testcase,string_arr;
testcase=parseInt(readLine());
string_arr=readLine().split(' ');
console.log(doubleAgents(string_arr));
