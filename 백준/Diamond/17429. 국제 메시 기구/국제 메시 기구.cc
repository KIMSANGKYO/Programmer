#include <bits/stdc++.h>
using namespace std;
 
typedef unsigned long long ll;
const ll mod = 1LL << 32;
 
struct Seg{
	ll tree[1500000];
	ll tmp[1500000][2];
 
	void push(int node, int s, int e){
		if(tmp[node][0] == 1 && tmp[node][1] == 0) return;
		tree[node] *= tmp[node][0]; tree[node] %= mod;
		tree[node] += (e-s+1) * tmp[node][1]; tree[node] %= mod;
		if(s ^ e){
			tmp[node*2][0] *= tmp[node][0]; tmp[node*2][0] %= mod;
			tmp[node*2][1] *= tmp[node][0]; tmp[node*2][1] %= mod;
			tmp[node*2][1] += tmp[node][1]; tmp[node*2][1] %= mod;
 
			tmp[node*2+1][0] *= tmp[node][0]; tmp[node*2+1][0] %= mod;
			tmp[node*2+1][1] *= tmp[node][0]; tmp[node*2+1][1] %= mod;
			tmp[node*2+1][1] += tmp[node][1]; tmp[node*2+1][1] %= mod;
		}
		tmp[node][0] = 1, tmp[node][1] = 0;
	}
 
	void update(int node, int s, int e, int l, int r, ll mul, ll sum){
		push(node, s, e);
		if(r < s || e < l) return;
		if(l <= s && e <= r){
			tree[node] *= mul; tree[node] %= mod;
			tree[node] += (e-s+1) * sum; tree[node] %= mod;
			if(s ^ e){
				tmp[node*2][0] *= mul; tmp[node*2][0] %= mod;
				tmp[node*2][1] *= mul; tmp[node*2][1] %= mod;
				tmp[node*2][1] += sum; tmp[node*2][1] %= mod;
 
				tmp[node*2+1][0] *= mul; tmp[node*2+1][0] %= mod;
				tmp[node*2+1][1] *= mul; tmp[node*2+1][1] %= mod;
				tmp[node*2+1][1] += sum; tmp[node*2+1][1] %= mod;
			}
			return;
		}
		int m = s + e >> 1;
		update(node*2, s, m, l, r, mul, sum);
		update(node*2+1, m+1, e, l, r, mul, sum);
		tree[node] = (tree[node*2] + tree[node*2+1]) % mod;
	}
 
	ll query(int node, int s, int e, int l, int r){
		push(node, s, e);
		if(r < s || e < l) return 0;
		if(l <= s && e <= r) return tree[node];
		int m = s + e >> 1;
		ll t1 = query(node*2, s, m, l, r);
		ll t2 = query(node*2+1, m+1, e, l, r);
		return (t1 + t2) % mod;
	}
} seg;
 
int in[500009], out[500009], top[500009], sz[500009], par[500009], dep[500009];
int chk[500009], pv;
int n, q;
vector<int> g[500009], inp[500009];
 
void dfs(int v = 1){
	chk[v] = 1;
	for(auto i : inp[v]){
		if(chk[i]) continue;
		chk[i] = 1;
		g[v].push_back(i);
		dfs(i);
	}
}
 
void dfs1(int v = 1){
	sz[v] = 1;
	for(auto &i : g[v]){
		dep[i] = dep[v] + 1; par[i] = v;
		dfs1(i); sz[v] += sz[i];
		if(sz[i] > sz[g[v][0]]) swap(i, g[v][0]);
	}
}
 
void dfs2(int v = 1){
	in[v] = ++pv;
	for(auto i : g[v]){
		top[i] = i == g[v][0] ? top[v] : i;
		dfs2(i);
	}
	out[v] = pv;
}
 
void increaseSubtree(int x, ll value){
	seg.update(1, 1, n, in[x], out[x], 1, value);
}
 
void increasePath(int a, int b, ll value){
	while(top[a] != top[b]){
		if(dep[top[a]] < dep[top[b]]) swap(a, b);
		int st = top[a];
		seg.update(1, 1, n, in[st], in[a], 1, value);
		a = par[st];
	}
	if(dep[a] > dep[b]) swap(a, b);
	seg.update(1, 1, n, in[a], in[b], 1, value);
}
 
void multiplySubtree(int x, ll value){
	seg.update(1, 1, n, in[x], out[x], value, 0);
}
 
void multiplyPath(int a, int b, ll value){
	while(top[a] != top[b]){
		if(dep[top[a]] < dep[top[b]]) swap(a, b);
		int st = top[a];
		seg.update(1, 1, n, in[st], in[a], value, 0);
		a = par[st];
	}
	if(dep[a] > dep[b]) swap(a, b);
	seg.update(1, 1, n, in[a], in[b], value, 0);
}
 
ll getSubtreeSum(int x){
	return seg.query(1, 1, n, in[x], out[x]);
}
 
ll getPathSum(int a, int b){
	ll sum = 0;
	while(top[a] != top[b]){
		if(dep[top[a]] < dep[top[b]]) swap(a, b);
		int st = top[a];
		sum += seg.query(1, 1, n, in[st], in[a]);
		sum %= mod;
		a = par[st];
	}
	if(dep[a] > dep[b]) swap(a, b);
	sum += seg.query(1, 1, n, in[a], in[b]);
	sum %= mod;
	return sum;
}
 
int main(){
	ios_base::sync_with_stdio(0); cin.tie(0);
	cin >> n >> q;
	for(int i=1; i<n; i++){
		int s, e; cin >> s >> e;
		inp[s].push_back(e);
		inp[e].push_back(s);
	}
	dfs(); dfs1(); dfs2();
 
	while(q--){
		int op; cin >> op;
		if(op == 1){
			ll a, b; cin >> a >> b;
			increaseSubtree(a, b);
		}else if(op == 2){
			ll a, b, c; cin >> a >> b >> c;
			increasePath(a, b, c);
		}else if(op == 3){
			ll a, b; cin >> a >> b;
			multiplySubtree(a, b);
		}else if(op == 4){
			ll a, b, c; cin >> a >> b >> c;
			multiplyPath(a, b, c);
		}else if(op == 5){
			ll a; cin >> a;
			cout << getSubtreeSum(a) << "\n";
		}else if(op == 6){
			ll a, b; cin >> a >> b;
			cout << getPathSum(a, b) << "\n";
		}
	}
}