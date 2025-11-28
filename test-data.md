# Secure Chat - 测试数据

## 销售场景测试数据

### B2B 销售
**角色**: Sales (B2B)
**输入消息**:
```
Hi, we're looking for an enterprise solution for our team of 200 people. Can you provide more information about your pricing and features?
```

**预期**: 专业、价值导向的回复，强调企业级功能和 ROI

---

### SaaS 销售
**角色**: Sales (SaaS)
**输入消息**:
```
I saw your product demo. It looks interesting but we're not sure if it fits our workflow. Can we try it first?
```

**预期**: 热情、解决方案导向，鼓励试用和演示

---

## 客服场景测试数据

### 温和型客服
**角色**: Customer Service (Gentle)
**输入消息**:
```
I'm really frustrated. I ordered this product 3 weeks ago and it still hasn't arrived. This is unacceptable!
```

**预期**: 温暖、共情、耐心，承认问题并积极解决

---

### 严格型客服
**角色**: Customer Service (Strict)
**输入消息**:
```
I want a refund. Your return policy says 30 days but I'm on day 32. This is unfair!
```

**预期**: 专业、坚定、政策导向，清晰说明政策但保持礼貌

---

## 面试场景测试数据

**角色**: Interview Assistant
**输入消息**:
```
Thank you for the interview opportunity. I wanted to follow up and ask about the next steps in the hiring process. Also, I'm curious about the team structure and growth opportunities.
```

**预期**: 专业、自信、结构化，展示价值同时询问合理问题

---

## 客户经理场景测试数据

**角色**: Account Manager
**输入消息**:
```
Hi, we've been using your service for 6 months now. We're happy but our contract is up for renewal. We're also considering some competitors. What can you offer to keep us?
```

**预期**: 平衡、专业、关系导向，主动提供价值同时维护关系

---

## 商务谈判场景测试数据

### 强势谈判
**角色**: Business Negotiation (Strong)
**输入消息**:
```
We understand your position, but our budget is fixed at $50k. If you can't meet this price, we'll have to look elsewhere.
```

**预期**: 自信、坚定、价值驱动，保护利益同时保持专业

---

### 中性谈判
**角色**: Business Negotiation (Neutral)
**输入消息**:
```
We're open to discussing terms, but we need to find a solution that works for both parties. What flexibility do you have?
```

**预期**: 平衡、协作、解决方案导向，寻求双赢

---

## 产品经理场景测试数据

**角色**: Product Manager
**输入消息**:
```
The stakeholders are asking for a timeline on the new feature. We need to balance speed with quality. What's your recommendation?
```

**预期**: 数据驱动、清晰、战略导向，有效沟通并推动决策

---

## 正式邮件场景测试数据

**角色**: Formal Business Email
**输入消息**:
```
Dear Team, I hope this email finds you well. I'm writing to propose a partnership opportunity that could benefit both our organizations. Would you be available for a call this week?
```

**预期**: 正式、结构化、专业，遵循商务邮件礼仪

---

## 冷启动场景测试数据

**角色**: Cold Outreach Assistant
**输入消息**:
```
Hi, I came across your company and thought you might be interested in our solution. Can we schedule a quick call?
```

**预期**: 吸引人、个性化、价值导向，简洁且可能获得积极回应

---

## 快速测试清单

### 基础功能测试
1. ✅ 选择角色 → 输入消息 → 发送
2. ✅ 检查流式响应是否正常工作
3. ✅ 检查是否生成 3 种风格回复
4. ✅ 检查分析部分是否显示

### 边界情况测试
1. **空消息**: 发送空消息应该被阻止
2. **未选择角色**: 应该提示选择角色
3. **长消息**: 测试超长消息的处理
4. **特殊字符**: 测试包含特殊字符的消息
5. **多行消息**: 测试多行文本输入

### 错误处理测试
1. **API 连接失败**: 应该显示友好错误信息
2. **超时**: 长时间无响应应该提示
3. **无效响应**: 格式错误的响应应该优雅处理

---

## 测试命令

### 测试本地 API 连接
```bash
curl --location 'http://localhost:3000/v1/chat/completions' \
--header 'Content-Type: application/json' \
--data '{
    "max_tokens": 1024,
    "messages": [
        {
            "role": "user",
            "content": "Hello, test message"
        }
    ],
    "stream": true
}'
```

### 测试非流式响应
```bash
curl --location 'http://localhost:3000/v1/chat/completions' \
--header 'Content-Type: application/json' \
--data '{
    "max_tokens": 1024,
    "messages": [
        {
            "role": "user",
            "content": "Hello, test message"
        }
    ],
    "stream": false
}'
```

---

## 推荐测试顺序

1. **基础连接测试**: 使用简单消息测试 API 连接
2. **角色测试**: 每个角色至少测试一次
3. **流式测试**: 确认流式响应正常工作
4. **错误处理**: 测试各种错误情况
5. **性能测试**: 测试长消息和多次连续请求

