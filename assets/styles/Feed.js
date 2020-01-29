const css = `
<style>
  .hfh1 {
    font-size:24px;
    line-height: 30px;
    color: #000;
    font-weight: 600;
  }
  section#post-list {
    width: 100%;
    max-width: 580px;
    margin: 0 auto;
    padding: 0 30px;
}

section#post-list article {
    background: #FFF;
    border: 1px solid #DDD;
    margin-top: 30px;
}

section#post-list article header {
    padding: 20px;

    display: flex;
    align-items: center;
    justify-content: space-between;
}

section#post-list article header .user-info {
    display: flex;
    flex-direction: column;
}


section#post-list article header .user-info span {
    font-size: 13px;
}

section#post-list article header .user-info span.place {
    font-size: 11px;
    color: #666;
    margin-top: 3px;
}

section#post-list article > img {
    width: 100%;
}

section#post-list article footer {
    padding: 20px;
}

section#post-list article footer .actions {
    margin-bottom: 10px;
}

section#post-list article footer .actions button {
    background: transparent;
    cursor: pointer;
    border: 0;
}

section#post-list article footer .actions img {
    height: 20px;
    margin-right: 10px;
}

section#post-list article footer p {
    font-size: 13px;
    margin-top: 2px;
    line-height: 18px;
}

section#post-list article footer p span {
    color: #7159c1;
    display: block;
}
</style>
`;
export default css;